


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card, CardDocument } from './schemas/card.schema';
import { KanbanGateway } from '../kanban.gateway'; 

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    private kanbanGateway: KanbanGateway,
  ) {}

  async create(createCardDto: CreateCardDto, userId: string, username: string): Promise<Card> { 
    // Contar tarjetas en la columna para determinar el 'order'
    const cardsInColumn = await this.cardModel.countDocuments({ columnId: createCardDto.columnId }).exec();
    const createdCard = new this.cardModel({
      ...createCardDto,
      order: cardsInColumn, // Asigna el orden
    });
    const savedCard = await createdCard.save();
    this.kanbanGateway.sendCardAdded(savedCard, userId, username); // Pasa userId y username al gateway
    return savedCard;
  }

  async findAll(): Promise<Card[]> {
    return this.cardModel.find().exec();
  }

  async findOne(id: string): Promise<Card> {
    const card = await this.cardModel.findById(id).exec();
    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }
    return card;
  }

  async update(id: string, updateCardDto: UpdateCardDto, userId: string, username: string): Promise<Card> { // <-- Añade userId y username
    const updatedCard = await this.cardModel.findByIdAndUpdate(id, updateCardDto, { new: true }).exec();
    if (!updatedCard) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }
    this.kanbanGateway.sendCardUpdated(updatedCard, userId, username); 
    return updatedCard;
  }

  async remove(id: string, userId: string, username: string) { 
    const deletedCard = await this.cardModel.findByIdAndDelete(id).exec();
    if (!deletedCard) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }
    this.kanbanGateway.sendCardDeleted(id, deletedCard.columnId, userId, username); 
    return deletedCard;
  }

  async moveCard(
    cardId: string,
    sourceColumnId: string,
    destinationColumnId: string,
    newOrder: number,
    userId: string, 
    username: string
  ): Promise<Card[]> {
    const movedCard = await this.cardModel.findById(cardId).exec();
    if (!movedCard) {
      throw new NotFoundException(`Card with ID "${cardId}" not found`);
    }

    // Reordenar y mover tarjetas entre columnas
    const session = await this.cardModel.db.startSession();
    session.startTransaction();

    try {
      if (sourceColumnId === destinationColumnId) {
        // Mover dentro de la misma columna
        const cardsInColumn = await this.cardModel.find({ columnId: sourceColumnId }).sort({ order: 1 }).session(session).exec();
        cardsInColumn.splice(movedCard.order, 1); // Eliminar de la posición original
        cardsInColumn.splice(newOrder, 0, movedCard); // Insertar en la nueva posición

        for (let i = 0; i < cardsInColumn.length; i++) {
          cardsInColumn[i].order = i;
          await this.cardModel.findByIdAndUpdate(cardsInColumn[i].id, { order: i }, { session }).exec();
        }
      } else {
        // Mover a una columna diferente
        // 1. Quitar de la columna de origen y reordenar
        const sourceCards = await this.cardModel.find({ columnId: sourceColumnId }).sort({ order: 1 }).session(session).exec();
        sourceCards.splice(movedCard.order, 1);
        for (let i = 0; i < sourceCards.length; i++) {
          sourceCards[i].order = i;
          await this.cardModel.findByIdAndUpdate(sourceCards[i].id, { order: i }, { session }).exec();
        }

        // 2. Añadir a la columna de destino y reordenar
        const destinationCards = await this.cardModel.find({ columnId: destinationColumnId }).sort({ order: 1 }).session(session).exec();
        destinationCards.splice(newOrder, 0, movedCard);

        // Actualizar la columna y el orden de la tarjeta movida
        await this.cardModel.findByIdAndUpdate(movedCard.id, { columnId: destinationColumnId, order: -1 }, { session }).exec(); // Temp order
        for (let i = 0; i < destinationCards.length; i++) {
          destinationCards[i].order = i;
          await this.cardModel.findByIdAndUpdate(destinationCards[i].id, { order: i }, { session }).exec();
        }
      }

      await session.commitTransaction();
      session.endSession();


      const allCards = await this.cardModel.find().exec();
      this.kanbanGateway.sendBoardCardsUpdated(allCards, userId, username); 
      return allCards;

    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
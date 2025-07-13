



import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateColumnDto } from './dto/create-column.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { MoveCardDto } from './dto/move-card.dto';
import { TasksGateway } from './tasks.gateway';
import { Card } from './shemas/card.schema';
import { Column } from './shemas/column.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Column.name) private columnModel: Model<Column>, 
    @InjectModel(Card.name) private cardModel: Model<Card>, 
    private tasksGateway: TasksGateway,
  ) {}

  async getAllColumns(): Promise<Column[]> {
   
    return this.columnModel.find().exec();
  }

  async createColumn(createColumnDto: CreateColumnDto): Promise<Column> {
    const newColumn = new this.columnModel({
      title: createColumnDto.title,
      cards: [],
    });
    const savedColumn = await newColumn.save();
    const allColumns = await this.getAllColumns(); 
    this.tasksGateway.emitColumnUpdate(allColumns);
    return savedColumn;
  }

  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    const { columnId, title, description } = createCardDto;
    const column = await this.columnModel.findById(columnId).exec();

    if (!column) {
      throw new NotFoundException(`Column with ID ${columnId} not found`);
    }

    const newCard = {
      // Mongoose asignará el _id automáticamente
      title,
      description,
      columnId,
      order: column.cards.length, 
    };

    column.cards.push(newCard as Card);
    await column.save(); 

    const allColumns = await this.getAllColumns();
    this.tasksGateway.emitColumnUpdate(allColumns);
    return newCard as Card; // Devuelve la tarjeta creada (Mongoose le asigna un _id)
  }

  async moveCard(moveCardDto: MoveCardDto): Promise<Column[]> {
    const { cardId, sourceColumnId, destinationColumnId, newIndex } = moveCardDto;

    const sourceColumn = await this.columnModel.findById(sourceColumnId).exec();
    const destinationColumn = await this.columnModel.findById(destinationColumnId).exec();

    if (!sourceColumn || !destinationColumn) {
      throw new NotFoundException('Source or destination column not found');
    }

    const cardIndex = sourceColumn.cards.findIndex(card => card.id === cardId);
    if (cardIndex === -1) {
      throw new NotFoundException(`Card with ID ${cardId} not found in source column`);
    }

    const [movedCard] = sourceColumn.cards.splice(cardIndex, 1); 
    movedCard.columnId = destinationColumnId; 

    destinationColumn.cards.splice(newIndex, 0, movedCard); 

    
    sourceColumn.cards.forEach((card, idx) => card.order = idx);
    destinationColumn.cards.forEach((card, idx) => card.order = idx);


    await sourceColumn.save();
    await destinationColumn.save();

    const allColumns = await this.getAllColumns();
    this.tasksGateway.emitColumnUpdate(allColumns);
    return allColumns;
  }

 
}

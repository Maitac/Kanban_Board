

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

import { KanbanGateway } from '../kanban.gateway'; 
import { Card, CardDocument } from '../cards/schemas/card.schema'; 
import { Column, ColumnDocument } from './shema/column.schema';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Column.name) private columnModel: Model<ColumnDocument>,
    @InjectModel(Card.name) private cardModel: Model<CardDocument>, 
    private kanbanGateway: KanbanGateway,
  ) {}

  async create(createColumnDto: CreateColumnDto, userId: string, username: string): Promise<Column> { 
    const columnsCount = await this.columnModel.countDocuments().exec();
    const createdColumn = new this.columnModel({
      ...createColumnDto,
      order: columnsCount,
    });
    const savedColumn = await createdColumn.save();
    this.kanbanGateway.sendColumnAdded(savedColumn, userId, username); 
    return savedColumn;
  }

  async findAll(): Promise<Column[]> {
    return this.columnModel.find().exec();
  }

  async findOne(id: string): Promise<Column> {
    const column = await this.columnModel.findById(id).exec();
    if (!column) {
      throw new NotFoundException(`Column with ID "${id}" not found`);
    }
    return column;
  }

  async update(id: string, updateColumnDto: UpdateColumnDto, userId: string, username: string): Promise<Column> { 
    const updatedColumn = await this.columnModel.findByIdAndUpdate(id, updateColumnDto, { new: true }).exec();
    if (!updatedColumn) {
      throw new NotFoundException(`Column with ID "${id}" not found`);
    }
    this.kanbanGateway.sendColumnUpdated(updatedColumn, userId, username); 
    return updatedColumn;
  }

  async remove(id: string, userId: string, username: string) { 
    const session = await this.columnModel.db.startSession();
    session.startTransaction();
    try {
      // Primero, eliminar todas las tarjetas asociadas a esta columna
      await this.cardModel.deleteMany({ columnId: id }).session(session).exec();

      // Luego, eliminar la columna
      const deletedColumn = await this.columnModel.findByIdAndDelete(id, { session }).exec();
      if (!deletedColumn) {
        throw new NotFoundException(`Column with ID "${id}" not found`);
      }

      await session.commitTransaction();
      session.endSession();

      this.kanbanGateway.sendColumnDeleted(id, userId, username); 
      return deletedColumn;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
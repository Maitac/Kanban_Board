



import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './schemas/card.schema';
import { Column, ColumnSchema } from 'src/columns/shema/column.schema';
import { KanbanGateway } from '../kanban.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    MongooseModule.forFeature([{ name: Column.name, schema: ColumnSchema }]), 
  ],
  controllers: [CardsController],
  providers: [CardsService, KanbanGateway,],
  
 exports: [CardsService] 
})
export class CardsModule {}
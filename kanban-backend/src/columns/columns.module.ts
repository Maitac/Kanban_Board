


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';

import { Card, CardSchema } from '../cards/schemas/card.schema'; 
import { KanbanGateway } from '../kanban.gateway'; 
import { Column, ColumnSchema } from './shema/column.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Column.name, schema: ColumnSchema },
      { name: Card.name, schema: CardSchema } 
    ])
  ],
  controllers: [ColumnsController],
  providers: [
    ColumnsService,
    KanbanGateway, 
  ],
  exports: [ColumnsService]
})
export class ColumnsModule {}
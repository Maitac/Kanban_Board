




import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksGateway } from './tasks.gateway';
import { Card,CardSchema } from './shemas/card.schema';
import { Column, ColumnSchema } from './shemas/column.schema'; 


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Column.name, schema: ColumnSchema },
      { name: Card.name, schema: CardSchema }, 
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksGateway],
})
export class TasksModule {}

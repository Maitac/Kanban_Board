



import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateColumnDto } from './dto/create-column.dto'; 
import { Column } from './shemas/column.schema';




@Controller('tasks') 
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('columns')
  async getAllColumns(): Promise<Column[]> {
    return this.tasksService.getAllColumns();
  }

  @Post('columns')
  async createColumn(@Body() createColumnDto: CreateColumnDto): Promise<Column> { 
    return this.tasksService.createColumn(createColumnDto);
  }

  
}


import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common'; 
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Request } from 'express'; 
import { Column } from './shema/column.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard) 
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  async create(@Body() createColumnDto: CreateColumnDto, @Req() req: Request): Promise<Column> {
    const user = req.user as any;
    console.log('Usuario que crea la columna:', user.username, user.userId); // Para depuración
    return this.columnsService.create(createColumnDto, user.userId, user.username);
  }

  @Get()
  async findAll(): Promise<Column[]> {
    return this.columnsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Column> {
    return this.columnsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto, @Req() req: Request): Promise<Column> {
    const user = req.user as any;
    return this.columnsService.update(id, updateColumnDto, user.userId, user.username);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.columnsService.remove(id, user.userId, user.username);
  }
}



import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common'; // <-- Importa UseGuards y Req
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './schemas/card.schema';

import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard) 
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto, @Req() req: Request): Promise<Card> { 
    const user = req.user as any; 
    console.log('Usuario que crea la tarjeta:', user.username, user.userId); 
    return this.cardsService.create(createCardDto, user.userId, user.username); // Pasa la info del usuario
  }

  @Get()
  async findAll(): Promise<Card[]> {
    return this.cardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Card> {
    return this.cardsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto, @Req() req: Request): Promise<Card> {
    const user = req.user as any;
    return this.cardsService.update(id, updateCardDto, user.userId, user.username); // Pasa la info del usuario
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.cardsService.remove(id, user.userId, user.username); // Pasa la info del usuario
  }

  // Para mover tarjetas, también protegido
  @Patch(':id/move')
  async moveCard(
    @Param('id') cardId: string,
    @Body('sourceColumnId') sourceColumnId: string,
    @Body('destinationColumnId') destinationColumnId: string,
    @Body('newOrder') newOrder: number,
    @Req() req: Request
  ) {
    const user = req.user as any;
    return this.cardsService.moveCard(
      cardId,
      sourceColumnId,
      destinationColumnId,
      newOrder,
      user.userId,
      user.username
    );
  }
}
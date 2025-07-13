

import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Card, CardDocument } from './cards/schemas/card.schema';

import { HydratedDocument } from 'mongoose'; 
import { Column, ColumnDocument } from './columns/shema/column.schema';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // URL del frontend
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class KanbanGateway {
  @WebSocketServer() server: Server;

 
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
    console.log(`Mensaje recibido del cliente ${client.id}: ${data}`);
    this.server.emit('message', `Servidor dice: Recibí tu mensaje: "${data}"`);
    return 'Mensaje procesado';
  }

  
  sendCardAdded(card: HydratedDocument<Card>, userId: string, username: string) {
    this.server.emit('cardAdded', { ...card.toJSON(), userId, username });
  }

  sendCardUpdated(card: HydratedDocument<Card>, userId: string, username: string) {
    this.server.emit('cardUpdated', { ...card.toJSON(), userId, username });
  }

  sendCardDeleted(cardId: string, columnId: string, userId: string, username: string) {
    this.server.emit('cardDeleted', { id: cardId, columnId, userId, username });
  }

  sendBoardCardsUpdated(allCards: HydratedDocument<Card>[], userId: string, username: string) {   

    const allCardsJSON = allCards.map(card => card.toJSON());
    this.server.emit('boardCardsUpdated', { cards: allCardsJSON, userId, username });
  }

  // Usa HydratedDocument<Column> para que TypeScript reconozca .toJSON()
  sendColumnAdded(column: HydratedDocument<Column>, userId: string, username: string) { 
    this.server.emit('columnAdded', { ...column.toJSON(), userId, username });
  }

  sendColumnUpdated(column: HydratedDocument<Column>, userId: string, username: string) { 
    this.server.emit('columnUpdated', { ...column.toJSON(), userId, username });
  }

  sendColumnDeleted(columnId: string, userId: string, username: string) {
    this.server.emit('columnDeleted', { id: columnId, userId, username });
  }
}
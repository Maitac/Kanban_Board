

// src/tasks/tasks.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common'; // Importa Logger

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // O el puerto de tu frontend Vite
    methods: ['GET', 'POST'],
    credentials: true,
  },
  // Puedes especificar un path si es necesario, por ejemplo: path: '/socket.io'
})
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server; // Instancia del servidor Socket.IO
  private logger: Logger = new Logger('TasksGateway'); // Para logs

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Cliente conectado: ${client.id}`);
    // Opcional: Emitir el estado actual del tablero al nuevo cliente
    // this.server.emit('columns_updated', this.tasksService.getAllColumns());
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  // Este método será llamado desde TasksService para emitir actualizaciones
  emitColumnUpdate(columns: any) {
    this.logger.log('Emitiendo columns_updated a todos los clientes');
    this.server.emit('columns_updated', columns);
  }

  // Puedes añadir más métodos para escuchar eventos específicos del cliente si es necesario
  // @SubscribeMessage('some_event_from_client')
  // handleSomeEvent(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
  //   this.logger.log(`Evento 'some_event_from_client' recibido de ${client.id}:`, data);
  //   // Lógica para manejar el evento
  // }
}

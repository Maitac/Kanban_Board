


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { KanbanGateway } from './kanban.gateway'; 
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
        ConfigModule.forRoot({ 
      isGlobal: true, 
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/kanban', {
      
      connectionFactory: (connection) => {
      
        connection.plugin(function(schema) {
          schema.set('toJSON', {
            virtuals: true, 
            versionKey: false, 
            transform: function(doc, ret) {
              ret.id = ret._id; 
              delete ret._id;   
             
            }
          });
        });
        return connection;
      },
    }),
    ColumnsModule,
    CardsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  KanbanGateway, ],

})
export class AppModule {}
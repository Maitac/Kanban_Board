


import React, { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import type { ColumnType } from '../types';
import CardComponent from './Card';


interface ColumnProps {
  column: ColumnType;
 
  onDeleteCard: (cardId: string, columnId: string) => void;
  onDeleteColumn: (columnId: string) => void;
  onAddCard: (title: string, columnId: string) => Promise<void>;
}

const Column: React.FC<ColumnProps> = ({ column, onDeleteCard, onDeleteColumn, onAddCard }) => {
  const [newCardTitle, setNewCardTitle] = useState('');

  const handleAddCard = async () => {
    if (newCardTitle.trim() === '') {
      alert('El título de la tarjeta no puede estar vacío.');
      return;
    }
    await onAddCard(newCardTitle, column.id);
    setNewCardTitle('');
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg w-72 flex-shrink-0 flex flex-col">
       
    <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-white">{column.title}</h3>
        <button
          onClick={() => onDeleteColumn(column.id)}
          className="p-1 text-red-400 hover:text-red-600 focus:outline-none"
          title="Eliminar columna"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-grow min-h-[50px]"
          >
            {column.cards.map((card, index) => (
              <CardComponent
                key={card.id}
                card={card}
                index={index}
                onDelete={(cardId: string) => onDeleteCard(cardId, column.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {}
      <div className="mt-4 flex items-center space-x-2"> {}
        <input
          type="text"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          placeholder="+ Add another card"
          className="flex-grow p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" /* CAMBIO: flex-grow y eliminación de mb-2 */
        />
        <button
          onClick={handleAddCard}
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors h-10 w-10 flex items-center justify-center text-xl font-bold" /* CAMBIO: p-2, w-10, h-10, flex, items-center, justify-center, text-xl, font-bold */
          title="Add card" 
        >
          + {}
        </button>
      </div>
    </div>
  );
};

export default Column;
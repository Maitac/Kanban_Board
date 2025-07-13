



import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { type Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  index: number;
  onDelete: (cardId: string) => void; 
}

const Card: React.FC<CardProps> = ({ card, index, onDelete }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-3 rounded shadow-sm mb-3 flex justify-between items-center" 
        >
          <div>
            <h4 className="font-semibold text-gray-800">{card.title}</h4>
            {card.description && <p className="text-gray-600 text-sm mt-1">{card.description}</p>}
          </div>
          {/* --- BOTÓN DE PAPELERA PARA TARJETA --- */}
          <button
            onClick={() => onDelete(card.id)} 
            className="ml-2 p-1 text-red-500 hover:text-red-700 focus:outline-none"
            title="Eliminar tarjeta"
          >
            {/* SVG para el icono de papelera */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
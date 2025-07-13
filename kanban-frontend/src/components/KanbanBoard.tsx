


import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import type { ColumnType, Card } from '../types';
 
import ColumnComponent from './Column';

import Notification from './Notification'; 
import { useAuth } from '../auth/AuthContext'; 
import { Navigate, useNavigate } from 'react-router-dom'; 
import AddColumnForm from './AddColumnForm';

const API_BASE_URL = 'http://localhost:3000';
const SOCKET_SERVER_URL = 'http://localhost:3000';

const KanbanBoard: React.FC = () => {
  const { user, token, logout, isLoading: authLoading } = useAuth(); 
  const navigate = useNavigate();

  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const socketRef = useRef<Socket | null>(null);

  
  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Configura Axios 
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);


  // Cargar datos iniciales del tablero
  const fetchBoardData = useCallback(async () => {
    if (!token) { 
        console.log("No token available, skipping board data fetch.");
        return;
    }
    try {
      const [columnsRes, cardsRes] = await Promise.all([
        axios.get<ColumnType[]>(`${API_BASE_URL}/columns`),
        axios.get<Card[]>(`${API_BASE_URL}/cards`),
      ]);

      const fetchedColumns = columnsRes.data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)); 
      const fetchedCards = cardsRes.data;

     
      const columnsWithCards = fetchedColumns.map((column) => ({
        ...column,
        cards: fetchedCards
          .filter((card) => card.columnId === column.id)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)), 
      }));
      setColumns(columnsWithCards);
    } catch (error) {
      console.error('Error fetching board data:', error);
      showNotification('Error al cargar el tablero.', 'error');
      
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logout(); 
        navigate('/login'); 
      }
    }
  }, [token, showNotification, logout, navigate]);

  useEffect(() => {
    fetchBoardData();
  }, [fetchBoardData]); 


  // Configuración de WebSocket
  useEffect(() => {
    if (!token || authLoading) return; 

    
    if (socketRef.current) {
        socketRef.current.disconnect();
    }

    const socket = io(SOCKET_SERVER_URL, {
        extraHeaders: {
            Authorization: `Bearer ${token}` 
        }
    });
    socketRef.current = socket;

    socket.on('connect', () => {
        console.log('Conectado al servidor WebSocket');
        showNotification('Conectado al servidor en tiempo real.', 'success');
    });

    socket.on('disconnect', () => {
        console.log('Desconectado del servidor WebSocket');
        showNotification('Desconectado del servidor en tiempo real.', 'error');
    });

    socket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
        showNotification('Error de conexión en tiempo real.', 'error');
    });

    // Handlers de eventos WebSocket para actualizar el estado del tablero
    socket.on('cardAdded', (data: Card & { userId: string, username: string }) => {
      
      if (data.userId !== user?.userId) {
        showNotification(`Nueva tarjeta de ${data.username}: "${data.title}"`, 'info');
        setColumns((prevColumns) =>
          prevColumns.map((col) =>
            col.id === data.columnId
              ? { ...col, cards: [...col.cards, data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) }
              : col
          )
        );
      }
    });

    socket.on('cardUpdated', (data: Card & { userId: string, username: string }) => {
      if (data.userId !== user?.userId) {
        showNotification(`Tarjeta actualizada por ${data.username}: "${data.title}"`, 'info');
        setColumns((prevColumns) =>
          prevColumns.map((col) => ({
            ...col,
            cards: col.cards.map((card) => (card.id === data.id ? { ...card, ...data } : card)),
          }))
        );
      }
    });

    socket.on('cardDeleted', (data: { id: string; columnId: string; userId: string, username: string }) => {
      if (data.userId !== user?.userId) {
        showNotification(`Tarjeta eliminada por ${data.username}.`, 'info');
        setColumns((prevColumns) =>
          prevColumns.map((col) =>
            col.id === data.columnId ? { ...col, cards: col.cards.filter((card) => card.id !== data.id) } : col
          )
        );
      }
    });

    socket.on('boardCardsUpdated', (data: { cards: Card[]; userId: string, username: string }) => {
      if (data.userId !== user?.userId) {
        showNotification(`Tablero sincronizado por ${data.username} (movimiento de tarjeta).`, 'info');
        
        setColumns((prevColumns) => {
          return prevColumns.map(col => ({
            ...col,
            cards: data.cards.filter(card => card.columnId === col.id)
                            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          })).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)); 
        });
      }
    });

    socket.on('columnAdded', (data: ColumnType & { userId: string, username: string }) => {
      if (data.userId !== user?.userId) {
        showNotification(`Nueva columna de ${data.username}: "${data.title}"`, 'info');
        setColumns((prevColumns) => [...prevColumns, { ...data, cards: [] }].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      }
    });

    socket.on('columnUpdated', (data: ColumnType & { userId: string, username: string }) => {
      if (data.userId !== user?.userId) {
        showNotification(`Columna actualizada por ${data.username}: "${data.title}"`, 'info');
        setColumns((prevColumns) =>
          prevColumns.map((col) => (col.id === data.id ? { ...col, ...data } : col))
                       .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        );
      }
    });

    socket.on('columnDeleted', (data: { id: string; userId: string, username: string }) => {
      if (data.userId !== user?.userId) {
        showNotification(`Columna eliminada por ${data.username}.`, 'info');
        setColumns((prevColumns) => prevColumns.filter((col) => col.id !== data.id));
      }
    });


    return () => {
        socket.disconnect();
        socketRef.current = null;
        console.log('WebSocket desconectado al desmontar o al cambiar token/authLoading');
    };
  }, [token, user, showNotification, authLoading]); 

  // Funciones de manejo de la API
  const handleAddCard = useCallback(async (title: string, columnId: string) => {
    try {
      showNotification('Solicitud para añadir tarjeta enviada.', 'info');
      await axios.post(`${API_BASE_URL}/cards`, { title, columnId });
  
    } catch (error) {
      console.error('Error al añadir tarjeta:', error);
      showNotification('Error al añadir tarjeta.', 'error');
    }
  }, [showNotification]);

  const handleDeleteCard = useCallback(async (cardId: string, columnId: string) => {
    try {
      showNotification('Solicitud para eliminar tarjeta enviada.', 'info');
      await axios.delete(`${API_BASE_URL}/cards/${cardId}`);
      
    } catch (error) {
      console.error('Error al eliminar tarjeta:', error);
      showNotification('Error al eliminar tarjeta.', 'error');
    }
  }, [showNotification]);

  const handleDeleteColumn = useCallback(async (columnId: string) => {
    try {
      showNotification('Solicitud para eliminar columna enviada.', 'info');
      await axios.delete(`${API_BASE_URL}/columns/${columnId}`);
      
    } catch (error) {
      console.error('Error al eliminar columna:', error);
      showNotification('Error al eliminar columna.', 'error');
    }
  }, [showNotification]);

  const handleAddColumnSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (newColumnTitle.trim()) {
      try {
        showNotification('Solicitud para añadir columna enviada.', 'info');
        await axios.post(`${API_BASE_URL}/columns`, { title: newColumnTitle });
        setNewColumnTitle('');
        setIsAddingColumn(false);
        
      } catch (error) {
        console.error('Error al añadir columna:', error);
        showNotification('Error al añadir columna.', 'error');
      }
    }
  }, [newColumnTitle, showNotification]);

  const onDragEnd = useCallback(async (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) {
      return;
    }

    // Movimiento de columnas
    if (type === 'column') {
      if (source.index === destination.index) {
        return;
      }

      const movedColumnId = result.draggableId;
      const newOrder = destination.index;

      try {
        showNotification(`Movimiento de columna enviado.`, 'info');
        await axios.patch(`${API_BASE_URL}/columns/${movedColumnId}`, { order: newOrder });
        
      } catch (error) {
        console.error('Error al mover columna:', error);
        showNotification('Error al mover columna.', 'error');
      }
      return;
    }

    // Movimiento de tarjetas
    if (type === 'card') {
      const sourceColumnId = source.droppableId;
      const destinationColumnId = destination.droppableId;
      const movedCardId = result.draggableId;
      const newOrder = destination.index;

      // Obtener la tarjeta que se está moviendo
      const movedCard = columns
        .find((col) => col.id === sourceColumnId)
        ?.cards.find((card) => card.id === movedCardId);

      if (!movedCard) {
        return; 
      }

      try {
        showNotification('Solicitud de movimiento de tarjeta enviada.', 'info');
        await axios.patch(`${API_BASE_URL}/cards/${movedCardId}/move`, {
          sourceColumnId,
          destinationColumnId,
          newOrder,
        });
       
      } catch (error) {
        console.error('Error al mover tarjeta:', error);
        showNotification('Error al mover tarjeta.', 'error');
      }
    }
  }, [columns, showNotification]);



  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl">Loading board...</p>
      </div>
    );
  }

  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-white-800 p-4 shadow-md flex justify-between items-center">
        <h1 className="text-3xl feenont-extrabold text-blue-400">Kanban Board</h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg text-gray-300">Welcome, {user.username}!</span> {/* Muestra el nombre de usuario */}
          <button
            onClick={logout} // Botón de logout
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="column" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex-grow flex p-6 space-x-6 overflow-x-auto"
            >
              {columns.map((column, index) => (
                <ColumnComponent
                  key={column.id}
                  column={column}
                  
                  onDeleteCard={handleDeleteCard}
                  onDeleteColumn={handleDeleteColumn}
                  onAddCard={handleAddCard}
                />
              ))}
              {provided.placeholder}

              {/* Add Column Button / Form */}
              <div className="flex-shrink-0 w-72">
                {!isAddingColumn ? (
                  <button
                    onClick={() => setIsAddingColumn(true)}
                    className="w-full bg-gray-700 text-gray-300 p-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center text-lg font-semibold"
                  >
                    + Add new column
                  </button>
                ) : (
                  <AddColumnForm
                    newColumnTitle={newColumnTitle}
                    setNewColumnTitle={setNewColumnTitle}
                    handleAddColumnSubmit={handleAddColumnSubmit}
                    setIsAddingColumn={setIsAddingColumn}
                  />
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
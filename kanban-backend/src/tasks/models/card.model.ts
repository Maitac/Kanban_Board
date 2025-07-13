


export interface Card {
  id: string;
  title: string;
  description?: string; // La descripción es opcional
  columnId: string; // ¡Importante! Para saber a qué columna pertenece
  order: number; // Para manejar el orden de las tarjetas dentro de una columna
}

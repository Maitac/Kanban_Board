




export interface Card {
  id: string;
  title: string;
  description: string;
  columnId: string;
  order: number; 
}


export interface ColumnType {
  id: string;
  title: string;
  cards: Card[]; 
  order?: number;


  
}

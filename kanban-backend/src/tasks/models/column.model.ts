import { Card } from "./card.model";

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}
export { Card };


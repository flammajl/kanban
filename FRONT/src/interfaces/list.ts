export interface ICardList {
  id: string;
  titulo: string;
  conteudo: string;
  lista: 'ToDo' | 'Doing' | 'Done';
}

export interface IList {
  list: 'ToDo' | 'Doing' | 'Done';
  cards: ICardList[];
}

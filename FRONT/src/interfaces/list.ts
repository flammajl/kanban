export interface ICardList {
  id: string;
  titulo: string;
  conteudo: string;
  lista: string;
}

export interface IList {
  list: string;
  cards: ICardList[];
}

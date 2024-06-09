export interface IAuthor {
  name: string;
}

export interface IBook {
  id: string;
  title: string;
  releaseDate: string;
  description: string;
  authorId: string;
  imageUrl?: string;
  Author: IAuthor;
}

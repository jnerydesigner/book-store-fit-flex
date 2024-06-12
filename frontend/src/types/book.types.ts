export interface IBook {
  id: string;
  title: string;
  releaseDate: string;
  description: string;
  authorId: string;
  imageUrl: string;
  Author: {
    name: string;
  };
}

export interface IAuthorBook {
  name: string;
}

export interface IBookContext {
  id: string;
  title: string;
  releaseDate: string;
  description: string;
  authorId: string;
  imageUrl: string;
  author: string;
}

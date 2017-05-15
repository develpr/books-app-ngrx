import { BookType } from './book-type';

export interface Account {  
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  office?: any;
  address?: any;
  favoriteBookType: BookType | null
  bookTypes: BookType[]
}

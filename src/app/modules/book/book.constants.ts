import { IBookFiltarableFileds, IBookSearchableFileds } from "./book.interface";

const searchableFileds: IBookSearchableFileds = ["title", "author", "genre"];
const filterableFileds: IBookFiltarableFileds = ["genre", "publicationYear"];

export const BookConstants = { searchableFileds, filterableFileds };

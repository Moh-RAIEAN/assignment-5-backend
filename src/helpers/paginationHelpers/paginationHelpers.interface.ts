import { SortOrder } from "mongoose";

export type IFilters = {
  searchTerm?: string;
  genre?: string;
  publicationDate?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
};

export type IPaginationOptions = {
  page: number;
  limit: number;
  total: number;
  skip: number;
};

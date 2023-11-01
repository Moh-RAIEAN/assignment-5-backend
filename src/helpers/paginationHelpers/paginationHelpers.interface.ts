export type IFilters = {
  searchTerm?: string;
  genre?: string;
  publicationDate?: string;
};

export type IPaginationOptions = {
  page: number;
  limit: number;
  total: number;
  skip: number;
};

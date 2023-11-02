import { IFilters } from "../paginationHelpers/paginationHelpers.interface";

const searchCondition = (searchTerm: string, searchableFileds: string[]) => {
  const searchCondition = searchableFileds.map((field) => {
    return { [field]: { $regex: searchTerm, $options: "i" } };
  });
  return searchCondition;
};

const filtersCondition = (
  filterOptions: Record<string | number, unknown> = {},
) => {
  const filtersCondition = Object.keys(filterOptions).map((option) => {
    return { [option]: filterOptions[option] };
  });
  return filtersCondition;
};

const sortCondition = (sortOptions: Pick<IFilters, "sortBy" | "sortOrder">) => {
  const { sortBy = "createdAt", sortOrder = "asc" } = sortOptions;
  const sortCondition = {
    [sortBy]: sortOrder,
  };

  return sortCondition;
};

export const filterHelpers = {
  searchCondition,
  filtersCondition,
  sortCondition,
};

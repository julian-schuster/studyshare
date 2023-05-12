import { PAGINATION } from "../constants";

export const getPageCount = (groups) => {
  const { GROUPS_PER_PAGE } = PAGINATION;
  return groups === null || groups.length === 0
    ? 1
    : Math.ceil(groups.length / GROUPS_PER_PAGE);
};

export const getPageContent = (groupArray, page, isLoading) => {
  if (!isLoading) {
    const { GROUPS_PER_PAGE } = PAGINATION;
    return [...groupArray].splice(
      (page - 1) * GROUPS_PER_PAGE,
      GROUPS_PER_PAGE
    );
  }
};

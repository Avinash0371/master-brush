export type PaginationQuery = {
  page?: number;
  limit?: number;
};

export const buildPagination = (query: PaginationQuery) => {
  const page = Number(query.page) > 0 ? Number(query.page) : 1;
  const limit = Number(query.limit) > 0 ? Number(query.limit) : 20;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const buildMeta = (page: number, limit: number, total: number) => {
  const totalPages = Math.ceil(total / limit) || 1;
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
};

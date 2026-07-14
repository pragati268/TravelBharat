import API from "./api";

export const getCategories = async () => {
  const { data } = await API.get("/categories");
  return data.categories;
};

export const getCategoryBySlug = async (slug) => {
  const { data } = await API.get(`/categories/${slug}`);
  return data.category;
};

import API from "./api";

export const getFeaturedTouristPlaces = async () => {
  const { data } = await API.get("/places/featured");
  return data.data;
};

export const getTouristPlaceBySlug = async (slug) => {
  const { data } = await API.get(`/places/${slug}`);
  return data.data;
};

export const searchTouristPlaces = async (query) => {
  const { data } = await API.get("/places/search", { params: { q: query } });
  return data.data;
};

export const getTouristPlacesByCategory = async (categoryId) => {
  const { data } = await API.get(`/places/category/${categoryId}`);
  return data.data;
};

export const getTouristPlacesByCity = async (cityId) => {
  const { data } = await API.get(`/places/city/${cityId}`);
  return data.data;
};

export const getTouristPlacesByState = async (stateId) => {
  const { data } = await API.get(`/places/state/${stateId}`);
  return data.data;
};

export const getUNESCOTouristPlaces = async () => {
  const { data } = await API.get("/places/unesco");
  return data.data;
};

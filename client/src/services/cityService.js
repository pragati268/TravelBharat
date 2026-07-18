import API from "./api";

export const getAllCities = async () => {
  const { data } = await API.get("/cities");
  return data.data;
};

export const getCitiesByStateId = async (stateId) => {
  const { data } = await API.get(`/cities/${stateId}/cities`);
  return data.data;
};

export const getCityBySlug = async (slug) => {
  const { data } = await API.get(`/cities/${slug}`);
  return data.data;
};

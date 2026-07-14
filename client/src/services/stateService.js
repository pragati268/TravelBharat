import API from "./api";

export const getStates = async () => {
  const { data } = await API.get("/states");
  return data.data;
};

export const getStateBySlug = async (slug) => {
  const { data } = await API.get(`/states/${slug}`);
  return data.data;
};

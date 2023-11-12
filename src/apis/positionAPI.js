import fetcher from "./fetcher";

export const getLocation = async () => {
  try {
    const res = await fetcher.get("/vi-tri", {});
    return res.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

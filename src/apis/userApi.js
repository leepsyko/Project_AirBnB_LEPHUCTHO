import fetcher from "./fetcher";

export const signUpAPI = async (payload) => {
  try {
    const response = await fetcher.post("auth/signup", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
};

export const signInAPI = async (payload) => {
  try {
    const response = await fetcher.post("auth/signin", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
};

export const getUserById = async (userId) => {
  try {
    const res = await fetcher.get(`users/${userId}`);
    return res.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const updateUser = async (userId, payload) => {
  try {
    const res = await fetcher.put(`users/${userId}`, payload);
    return res.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const updateUserImg = async (payload) => {
  try {
    const res = await fetcher.post("users/upload-avatar", payload);
    return res.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};


export const getUserAPI = async () => {
  try {
    const response = await fetcher.get("users");
    return response.data?.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
};


export const addUserAPI = async (payload) => {
  try {
    const response = await fetcher.post("users",payload);
    return response.data?.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
};


export const getInfoID = async (userId) => {
  try {
    const response = await fetcher.get(`users/${userId}`);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const editUser = async (userId, payload) => {
  try {
    const response = await fetcher.put(`users/${userId}`, payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};


export const removeUser = async (id) => {
  try {
    const response = await fetcher.delete("users", {
      params: {
        id: id || undefined,
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
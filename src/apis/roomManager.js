import fetcher from "./fetcher";


export const deleteRoom = async (roomId) => {
    try {
      const response = await fetcher.delete(`phong-thue/${roomId}`);
      return response.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
  };

  export const getRooms = async () => {
    try {
      const response = await fetcher.get(`phong-thue`);
      return response.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
  };

  export const addRoom = async (payload) => {
    try {
      const response = await fetcher.post(`phong-thue`, payload);
      return response.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
  };



  export const upLoadImgRoom = async (roomId, payload) => {
    try {
      const response = await fetcher.post(
        `phong-thue/upload-hinh-phong`,
        payload,
        {
          params: {
            maPhong: roomId,
          },
        }
      );
      return response.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
  };
  


  export const updateRoom = async (roomId, payload) => {
    try {
      const response = await fetcher.put(`phong-thue/${roomId}`, payload);
      return response.data?.content;
    } catch (error) {
      throw error.response.data?.content;
    }
  };
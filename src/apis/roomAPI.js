import fetcher from "./fetcher";

export const getRoomListById = async (locationId) => {
  try {
    const res = await fetcher("phong-thue/lay-phong-theo-vi-tri", {
      params: {
        maViTri: locationId,
      },
    });
    return res.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const getRoomDetailsById = async (roomId) => {
  try {
    const res = await fetcher.get(`phong-thue/${roomId}`);
    return res.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const getRoomById = async () => {
  try {
    const res = await fetcher.get("dat-phong");
    return res.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const BookingRoom = async (room) => {
  try {
    const res = await fetcher.post("dat-phong", room);
    return res.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const getRoomCommentById = async (roomId) => {
  try {
    const res = await fetcher.get(
      `binh-luan/lay-binh-luan-theo-phong/${roomId}`
    );
    return res.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

export const postRoomComment = async (room) => {
  try {
    const res = await fetcher.post("binh-luan", room);
    return res.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

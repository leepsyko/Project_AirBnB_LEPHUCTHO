import axios from "axios";

const fetcher = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api/",
  headers: {
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MiIsIkhldEhhblN0cmluZyI6IjI4LzAyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwOTA3ODQwMDAwMCIsIm5iZiI6MTY4MTE0NjAwMCwiZXhwIjoxNzA5MjI2MDAwfQ.GboZ7OZlrOvJ_T6lEZ9PfGJD8vygDn30BxaLgB43WbM",
  },
});

//REQUSEST INTERCEPTORs
fetcher.interceptors.request.use((request) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    request.headers.token = user.token;
  }

  return request;
});

// RESPONSE INTERCEPTORs
fetcher.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default fetcher;

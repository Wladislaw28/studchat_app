import { axios } from "core";

export default {
  getAllNews: () => axios.get("/news"),
  createNews: ({ text, description, category }) => axios.post("/news", { text, description, category }),
  removeNewsById: (id) => axios.delete("/news?id=" + id),
};
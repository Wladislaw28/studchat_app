import { axios } from "core";

export default {
  getAllNews: () => axios.get("/news"),
  createNews: ({ text, description, category, img }) => axios.post("/news", { text, description, category, img }),
  removeNewsById: (id) => axios.delete("/news?id=" + id),
};
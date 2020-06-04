import { newsApi } from "utils/api";

const Actions = {
  setNews: items => ({
    type: "NEWS:SET_ITEMS",
    payload: items
  }),
  setIsLoading: bool => ({
    type: "NEWS:SET_IS_LOADING",
    payload: bool
  }),
  setCurrentNewsId: id => ({
    type: "NEWS:SET_CURRENT_NEWS_ID",
    payload: id
  }),
  removeNewsById: id => dispatch => {
    if (window.confirm("Вы действительно хотите удалить новость?")) {
      newsApi
        .removeNewsById(id)
        .then(({ data }) => {
          dispatch({
            type: "NEWS:REMOVE_NEWS",
            payload: id
          });
        })
        .catch(() => {
          dispatch(Actions.setIsLoading(false));
        });
    }
  },
  fetchNews: () => dispatch => {
    dispatch(Actions.setIsLoading(true));
    newsApi
      .getAllNews()
      .then(({ data }) => {
        dispatch(Actions.setNews(data));
      })
      .catch(() => {
        dispatch(Actions.setIsLoading(false));
      });
  }
};

export default Actions;
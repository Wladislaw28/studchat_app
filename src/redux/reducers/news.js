const initialState = {
  items: [],
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'NEWS:ADD_NEWS':
      return {
        ...state,
        items: [...state.items, payload],
      };
    case 'NEWS:SET_ITEMS':
      return {
        ...state,
        items: payload,
        isLoading: false,
      };
    case 'NEWS:REMOVE_NEWS':
      return {
        ...state,
        items: state.items.filter(news => news._id !== payload),
      };
    case 'NEWS:SET_IS_LOADING':
      return {
        ...state,
        isLoading: payload,
      };
    case 'NEWS:SET_CURRENT_NEWS_ID':
      return {
        ...state,
        currentNewsId: payload,
      };
    default:
      return state;
  }
};

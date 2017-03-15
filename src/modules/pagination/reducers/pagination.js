const initalState = {
  users: {
    page: 1,
    itemsOnPage: 10,
  },
};

export default function pagination(state = initalState, action) {
  switch (action.type) {
    case 'PAGINATION_SET_PAGE':
      return {
        ...state,
        [action.endpoint]: {
          ...state[action.endpoint],
          page: action.payload,
        },
      };
    case 'PAGINATION_SET_ITEMS_ON_PAGE':
      return {
        ...state,
        [action.endpoint]: {
          ...state[action.endpoint],
          itemsOnPage: action.payload,
        },
      };
    default:
      return state;
  }
}

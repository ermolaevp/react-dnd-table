const initalState = {
  users: {
    data: [],
    total: 0,
  },
};

export default function data(state = initalState, action) {
  switch (action.type) {
    case 'DATA_RECEIVE':
      return {
        ...state,
        [action.endpoint]: action.payload,
      };
    default:
      return state;
  }
}

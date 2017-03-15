const toggleArray = (array = [], item) => {
  const filtered = array.filter(i => i !== item);
  if (filtered.length < array.length) return filtered; // remove item
  return [ // add item
    item,
    ...array,
  ];
};

export default function filters(state = {}, action = {}) {
  switch (action.type) {
    case 'FILTER_SET_GTE':
      return {
        ...state,
        [action.id]: {
          ...((typeof state[action.id] === 'object' && state[action.id]) || {}),
          gte: action.payload,
        },
      };
    case 'FILTER_SET_LTE':
      return {
        ...state,
        [action.id]: {
          ...((typeof state[action.id] === 'object' && state[action.id]) || {}),
          lte: action.payload,
        },
      };
    case 'FILTER_SET':
      return {
        ...state,
        [action.id]: action.payload,
      };
    case 'FILTER_TOGGLE':
      return {
        ...state,
        [action.id]: toggleArray(state[action.id], action.payload),
      };
    case 'FILTER_REMOVE':
      return {
        ...state,
        [action.id]: '',
      };
    default:
      return state;
  }
}

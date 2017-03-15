export default function sorts(state = {}, action) {
  switch (action.type) {
    case 'SORT_ASC':
      return {
        ...state,
        [action.id]: 'asc',
      };
    case 'SORT_DESC':
      return {
        ...state,
        [action.id]: 'desc',
      };
    case 'SORT_REMOVE':
      return {
        ...state,
        [action.id]: null,
      };
    default:
      return state;
  }
}

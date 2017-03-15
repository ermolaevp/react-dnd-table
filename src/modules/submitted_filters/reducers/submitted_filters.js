export default function submittedFilters(state = {}, action) {
  switch (action.type) {
    case 'SUBMIT_FILTER':
      return {
        ...state,
        [action.id]: action.payload,
      };
    case 'UNSUBMIT_FILTER':
      return {
        ...state,
        [action.id]: null,
      };
    default:
      return state;
  }
}

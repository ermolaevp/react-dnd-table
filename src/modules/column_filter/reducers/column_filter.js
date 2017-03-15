const initalState = {
  positionX: 0,
  positionY: 0,
  isVisible: false,
  columnId: '',
};

export default function columnFilter(state = initalState, action) {
  switch (action.type) {
    case 'COLUMN_FILTER_SET':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

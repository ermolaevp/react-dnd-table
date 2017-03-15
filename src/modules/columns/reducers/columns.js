import _ from 'lodash';

const initalState = {
  users: [],
};

const buildIndex = attributes => attributes.map((attr, index) => ({ ...attr, index: index * 10 }));

const replaceAttrs = (attrs, source, target, before = false) => {
  // example:     source  target
  //                   ↓  ↓
  // indexes before: 0 10 20 30
  // indexes after:  0 25 20 30
  // after sorting:  0 20 25 30
  // profit!
  const targetIndex = _(attrs).find({ id: target }).index;
  const res = attrs.map((attr) => {
    if (attr.id !== source) return attr;
    return {
      ...attr,
      index: (before ? targetIndex - 5 : targetIndex + 5),
    };
  });
  return _.sortBy(res, 'index');
};

const resizeColumn = (attrs, id, width) => {
  const index = _(attrs).findIndex({ id });
  return [
    ...attrs.slice(0, index),
    {
      ...attrs[index],
      width,
    },
    ...attrs.slice(index + 1),
  ];
};

export default function columns(state = initalState, action) {
  switch (action.type) {
    case 'COLUMNS_RECEIVE':
      return {
        ...state,
        [action.endpoint]: buildIndex(action.payload),
      };
    case 'COLUMNS_MOVE_LEFT':
      return {
        ...state,
        [action.endpoint]: buildIndex(replaceAttrs(state[action.endpoint], action.source, action.target, true)),
      };
    case 'COLUMNS_MOVE_RIGHT':
      return {
        ...state,
        [action.endpoint]: buildIndex(replaceAttrs(state[action.endpoint], action.source, action.target, false)),
      };
    case 'COLUMNS_SET_WIDTH':
      return {
        ...state,
        [action.endpoint]: resizeColumn(state[action.endpoint], action.id, action.width),
      };
    default:
      return state;
  }
}

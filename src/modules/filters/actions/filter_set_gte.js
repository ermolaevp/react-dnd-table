export default function filterSetGte(id, payload) {
  return {
    type: 'FILTER_SET_GTE',
    id,
    payload,
  };
}

export default function filterSetLte(id, payload) {
  return {
    type: 'FILTER_SET_LTE',
    id,
    payload,
  };
}

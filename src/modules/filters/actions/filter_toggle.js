export default function filterToggle(id, payload) {
  return {
    type: 'FILTER_TOGGLE',
    id,
    payload,
  };
}

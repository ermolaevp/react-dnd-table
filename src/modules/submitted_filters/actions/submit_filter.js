export default function submitFilter(id, payload) {
  return {
    type: 'SUBMIT_FILTER',
    id,
    payload,
  };
}

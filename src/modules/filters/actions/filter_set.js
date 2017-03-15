export default function filterSet(id, payload) {
  return {
    type: 'FILTER_SET',
    id,
    payload,
  };
}

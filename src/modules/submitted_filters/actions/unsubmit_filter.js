export default function unsubmitFilter(id) {
  return {
    type: 'UNSUBMIT_FILTER',
    id,
  };
}

export default function columnsSetWidth(endpoint, id, width) {
  return {
    type: 'COLUMNS_SET_WIDTH',
    endpoint,
    id,
    width,
  };
}

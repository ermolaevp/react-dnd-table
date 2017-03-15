export default function columnsReceive(endpoint, payload) {
  return {
    type: 'COLUMNS_RECEIVE',
    endpoint,
    payload,
  };
}

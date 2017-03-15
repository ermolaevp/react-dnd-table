export default function dataReceive(endpoint, payload) {
  return {
    type: 'DATA_RECEIVE',
    endpoint,
    payload,
  };
}

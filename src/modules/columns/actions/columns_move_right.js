export default function columnsMoveRight(endpoint, source, target) {
  return {
    type: 'COLUMNS_MOVE_RIGHT',
    endpoint,
    source,
    target,
  };
}

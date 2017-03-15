export default function columnsMoveLeft(endpoint, source, target) {
  return {
    type: 'COLUMNS_MOVE_LEFT',
    endpoint,
    source,
    target,
  };
}

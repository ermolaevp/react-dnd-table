export default function paginationSetPage(endpoint, payload) {
  return {
    type: 'PAGINATION_SET_PAGE',
    endpoint,
    payload,
  };
}

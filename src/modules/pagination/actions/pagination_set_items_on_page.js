export default function paginationSetItemsOnPage(endpoint, payload) {
  return {
    type: 'PAGINATION_SET_ITEMS_ON_PAGE',
    endpoint,
    payload,
  };
}

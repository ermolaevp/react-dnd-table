import React from 'react';
import { connect } from 'react-redux';

// Widgets
import Pagination from '../widgets/Pagination';

// Actions
import paginationSetItemsOnPage from '../modules/pagination/actions/pagination_set_items_on_page';
import paginationSetPage from '../modules/pagination/actions/pagination_set_page';

const mapStateToProps = ({ pagination, data }) => {
  const { page, itemsOnPage } = pagination.users;
  const { total } = data.users;
  return {
    total,
    itemsOnPage,
    page,
  };
};

const mapDispatchToProps = dispatch => ({
  setMaxResults(maxResults) {
    dispatch(paginationSetItemsOnPage('users', maxResults));
  },
  setPage(page) {
    if (isNaN(page)) return false;
    return dispatch(paginationSetPage('users', page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);

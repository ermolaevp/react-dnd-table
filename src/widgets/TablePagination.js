import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
const { _t } = tiasUtils

// Widgets
import Pagination from './widgets/Pagination'

// Actions
import maxResultsSet from '../../modules/endpoints/actions/max_results_set'
import pageSet from '../../modules/endpoints/actions/page_set'

const mapStateToProps = ({ endpoints }, { endpoint }) => {
  const { data, params } = endpoints[endpoint]
  const { _meta={}, _links={} } = data
  const { total=NaN } = _meta
  const { page, max_results } = params
  return {
    endpoint,
    total,
    max_results,
    page,
    next: page+1,
    prev: page-1>0?page-1:page,
    last: isNaN(total)?NaN:Math.ceil(total/max_results),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMaxResults(endpoint, maxResults) {
      dispatch(maxResultsSet(endpoint, maxResults))
    },
    setPage(endpoint, page) {
      if(isNaN(page)) return false;
      dispatch(pageSet(endpoint, page))
    }
  }
}

class TablePagination extends Component {
  render() {
    const { endpoint, setMaxResults, setPage } = this.props
    const handleSetMaxResults = (max_results) => {
      setMaxResults(endpoint, max_results)
    }
    const handleSetPage = (page) => {
      setPage(endpoint, page)
    }
    return(
      <Pagination
      {...this.props}
      setMaxResults={handleSetMaxResults}
      setPage={handleSetPage}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TablePagination)

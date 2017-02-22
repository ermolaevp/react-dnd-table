import React, { Component, PropTypes } from 'react'
// import { findDOMNode, unmountComponentAtNode } from 'react-dom'
import { connect } from 'react-redux'
import classnames from 'classnames'

// Widgets
import FilterForm from '../widgets/FilterForm'

// Actions
import tcfShow from '../modules/table_column_filter/actions/tcf_show'
import tcfClose from '../modules/table_column_filter/actions/tcf_close'
import pageSet from '../modules/endpoints/actions/page_set'
import filterSet from '../modules/endpoints/actions/filter_set'
import filterRemove from '../modules/endpoints/actions/filter_remove'

const mapStateToProps = ({ endpoints, table_column_filter }) => {
  const { endpoint, column={} } = table_column_filter
  const { params={}, data } = (endpoints[endpoint] || {})
  return {
    ...table_column_filter,
    column: column.id,
    filterType: column.filter_type,
    filter: params.filter ? (params.filter[column.id] || {}) : {},
    choices: (column.filter_type === 'subset' ? data._meta.choices[column.id] : []),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter(endpoint, column, data) {
      dispatch(tcfClose())
      dispatch(pageSet(endpoint, 1));
      dispatch(filterSet(endpoint, column, data))
    },
    resetFilter(endpoint, column) {
      dispatch(tcfClose())
      dispatch(pageSet(endpoint, 1));
      dispatch(filterRemove(endpoint, column))
    },
    closeTfc() {
      dispatch(tcfClose())
    }
  }
}

class TableColumnFilter extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    // filter: undefined || object || string || number,
    choices: PropTypes.array.isRequired,
    filterType: PropTypes.string,
    endpoint: PropTypes.string,
    column: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
    closeTfc: PropTypes.func.isRequired,
  }
  componentDidMount() {
    window.addEventListener('click', this.closeFilterForm.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.closeFilterForm.bind(this))
  }
  closeFilterForm(e) {
    if (this.props.isVisible) {
      this.props.closeTfc()
      // unmountComponentAtNode(findDOMNode(this))
    }
  }
  render() {
    const { setFilter, resetFilter, column, endpoint, isVisible } = this.props
    const handleSubmitForm = (data) => {
      setFilter(endpoint, column, data)
      return false
    }
    const handleResetForm = () => {
      resetFilter(endpoint, column)
    }
    return(
      <FilterForm
       {...this.props}
        prefix={`${endpoint}_${column}`}
        onSubmit={handleSubmitForm}
        onReset={handleResetForm}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableColumnFilter)

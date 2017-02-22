import style from '../widgets/ColumnMenu/style.css'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
const { _t } = tiasUtils

// Widgets
import CheckboxItem from '../widgets/ColumnMenu/checkbox_item'

// Actions
import attributeToggle from '../modules/attributes/actions/attribute_toggle'

const mapStateToProps = ({ attributes }, { endpoint }) => {
  return {
    columns: attributes[endpoint],
    isVisible: true,
    endpoint
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleColumn (endpoint, id) {
      dispatch(attributeToggle(endpoint, id));
    }
  }
}

class TableColumnsMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false
    }
    this.closeMenu = this.closeMenu.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  componentDidMount() {
    window.addEventListener('click', this.closeMenu)
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.closeMenu)
  }
  closeMenu() {
    this.setState({ isVisible: false })
  }
  toggleMenu(e) {
    e.stopPropagation()
    this.setState({ isVisible: !this.state.isVisible })
  }
  render() {
    const { columns, toggleMenu, endpoint, toggleColumn } = this.props
    const { isVisible } = this.state
    return(
      <div className="table-columns-menu">
        <i
          className="material-icons"
          title={_t("Select columns")}
          onClick={this.toggleMenu}
        >more_vert</i>
        {_t(endpoint)}
        <div
          className={classnames(["columns-menu menu", {hidden: !isVisible}])}
          onClick={e => e.stopPropagation()}
        >
          {columns.map((column, columnIndex) =>
            <CheckboxItem
              key={columnIndex}
              prefix={endpoint}
              checked={column.visibility}
              label={_t(column.id)}
              id={column.id}
              onChange={(e, id) => toggleColumn(endpoint, id)}
            />
          )}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableColumnsMenu)

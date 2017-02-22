import style from './pagination.css';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const { _t } = tiasUtils

const SelectPageForm = ({ setPage, totalPages }) => {
  let form
  const onSubmit = (e) => {
    e.preventDefault()
    const page = parseInt(form.pageInput.value, 0)
    if (page <= totalPages) setPage(page)
    return false
  }
  return(
    <span className="select-page-form">
      <form
        ref={node => form = node}
        onSubmit={onSubmit}
      >
        <input name="pageInput" type="text" placeholder={_t('page')}></input>
        <button><i className="material-icons">done</i></button>
      </form>
    </span>
  )
}

class Pagination extends Component {
  static propTypes = {
    prev: PropTypes.number.isRequired,
    next: PropTypes.number.isRequired,
    last: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    max_results: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    setMaxResults: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.toggleSelectMaxResultsMenu = this.toggleSelectMaxResultsMenu.bind(this);
    this.closeSelectMaxResultsMenu = this.closeSelectMaxResultsMenu.bind(this);
    this.state = {
      maxResultsMenuHidden: true
    }
  }
  componentDidMount() {
    window.addEventListener('click', this.closeSelectMaxResultsMenu);
  }
  componentWillUnmout() {
    window.removeEventListener(this.closeSelectMaxResultsMenu);
  }
  selectMaxResults(max_results) {
    this.props.setMaxResults(max_results);
    this.toggleSelectMaxResultsMenu();
  }
  toggleSelectMaxResultsMenu() {
    this.setState({ maxResultsMenuHidden: !this.state.maxResultsMenuHidden });
  }
  closeSelectMaxResultsMenu() {
    this.setState({ maxResultsMenuHidden: true });
  }
  render() {
    const { prev, next, last, total, max_results, page } = this.props;
    let totalPages = !isNaN(total) ? Math.ceil(total / max_results) : 0
    let pageString = _t('page') + ' ' + page
    if (!isNaN(total)) pageString += ' ' + _t('of') + ' ' + totalPages

    return (
      <div className="pagination">
        <span>{_t('Rows per page')}:</span>
        <div
          className="choose-results-on-page"
          onClick={e => e.stopPropagation()}
        >
          <a
            href="javascript:void(0)"
            onClick={this.toggleSelectMaxResultsMenu}
          >
            {max_results}
            {' '}
            <i className="material-icons">arrow_drop_down</i>
          </a>
          <div className={classnames(['inline-drop-down', { hidden: this.state.maxResultsMenuHidden }])}>
            {[50, 40, 30, 20, 10].map(x =>
              <div key={x} className="inline-drop-down-item" onClick={() => this.selectMaxResults(x)}>
                <span>{x}</span>
              </div>
            )}
          </div>
        </div>
        <span>{pageString}</span>
        { isNaN(total) ? <span className="go-first"><a href="javascript:void(0)" title={_t('Go to first page')} onClick={() => this.props.setPage(1)}><i className="material-icons">first_page</i></a></span> : ''}
        <span className="go-prev">
          <a
            title={_t('Go to page') + ` ${prev}`}
            href="javascript:void(0)"
            onClick={() => this.props.setPage(prev)}
          >
            <i className="material-icons">chevron_left</i>
          </a>
        </span>
        <span className="go-next">
          <a
            title={_t('Go to page') + ` ${next}`}
            href="javascript:void(0)"
            onClick={() => {this.props.setPage(next)}}
          >
            <i className="material-icons">chevron_right</i>
          </a>
        </span>
        { !isNaN(total) ? <SelectPageForm setPage={this.props.setPage} totalPages={totalPages}/> : '' }
      </div>
    )
  }
}

export default Pagination;

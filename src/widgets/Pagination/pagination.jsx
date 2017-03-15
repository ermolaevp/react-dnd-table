import style from './pagination.css';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const SelectPageForm = ({ setPage, totalPages }) => {
  let form;
  const onSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(form.pageInput.value, 0);
    if (page <= totalPages) setPage(page);
    return false;
  };
  return (
    <span className="select-page-form">
      <form
        ref={node => form = node}
        onSubmit={onSubmit}
      >
        <input name="pageInput" type="text" placeholder="page" />
        <button><i className="material-icons">done</i></button>
      </form>
    </span>
  );
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxResultsMenuHidden: true,
    };
    this.toggleSelectMaxResultsMenu = this.toggleSelectMaxResultsMenu.bind(this);
    this.closeSelectMaxResultsMenu = this.closeSelectMaxResultsMenu.bind(this);
  }
  componentDidMount() {
    window.addEventListener('click', this.closeSelectMaxResultsMenu);
  }
  componentWillUnmout() {
    window.removeEventListener(this.closeSelectMaxResultsMenu);
  }
  selectMaxResults(itemsOnPage) {
    this.props.setPage(1);
    this.props.setMaxResults(itemsOnPage);
    this.toggleSelectMaxResultsMenu();
  }
  toggleSelectMaxResultsMenu() {
    this.setState({ maxResultsMenuHidden: !this.state.maxResultsMenuHidden });
  }
  closeSelectMaxResultsMenu() {
    this.setState({ maxResultsMenuHidden: true });
  }
  render() {
    const { total, itemsOnPage, page } = this.props;
    const totalPages = !isNaN(total) ? Math.ceil(total / itemsOnPage) : 0;
    const next = page === totalPages ? page : page + 1;
    const prev = page - 1 > 0 ? page - 1 : page;

    let pageString = `page ${page}`;
    if (!isNaN(total)) pageString += ` of ${totalPages}`;

    return (
      <div className="pagination">
        <span>Rows per page:</span>
        <div
          className="choose-results-on-page"
          onClick={e => e.stopPropagation()}
        >
          <a
            href="javascript:void(0)"
            onClick={this.toggleSelectMaxResultsMenu}
          >
            {itemsOnPage}
            {' '}
            <i className="material-icons">arrow_drop_down</i>
          </a>
          <div className={classnames(['inline-drop-down', { hidden: this.state.maxResultsMenuHidden }])}>
            {[50, 40, 30, 20, 10].map(x =>
              <div key={x} className="inline-drop-down-item" onClick={() => this.selectMaxResults(x)}>
                <span>{x}</span>
              </div>,
            )}
          </div>
        </div>
        <span>{pageString}</span>
        { isNaN(total) ? <span className="go-first"><a href="javascript:void(0)" title="Go to first page" onClick={() => this.props.setPage(1)}><i className="material-icons">first_page</i></a></span> : ''}
        <span className="go-prev">
          <a
            title={`Go to page ${prev}`}
            href="javascript:void(0)"
            onClick={() => this.props.setPage(prev)}
          >
            <i className="material-icons">chevron_left</i>
          </a>
        </span>
        <span className="go-next">
          <a
            title={`Go to page ${next}`}
            href="javascript:void(0)"
            onClick={() => { this.props.setPage(next); }}
          >
            <i className="material-icons">chevron_right</i>
          </a>
        </span>
        { !isNaN(total) ? <SelectPageForm setPage={this.props.setPage} totalPages={totalPages} /> : '' }
      </div>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  itemsOnPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  setMaxResults: PropTypes.func.isRequired,
};

export default Pagination;

import { connect } from 'react-redux';

// Widgets
import Table from '../widgets/Table';
// import TableColumnFilter from '../widgets/TableColumnFilter';

const columns = [
  { id: 'first_name', title: 'First Name' },
  { id: 'last_name', title: 'Last Name' },
];

const data = [
  { first_name: 'Jon', last_name: 'Doe' },
];

const mapStateToProps = () => ({
  columns,
  data,
  endpoint: 'users',
});

const mapDispatchToProps = (dispatch) => ({
  fetchData(endpoint, params) {
    dispatch(dataFetch(endpoint, params));
  },
  moveColumnLeft(endpoint, source, target) {
    dispatch(attributePlaceBefore(endpoint, source, target));
  },
  moveColumnRight(endpoint, source, target) {
    dispatch(attributePlaceAfter(endpoint, source, target));
  },
  resizeColumn(endpoint, id, width) {
    dispatch(attributeSetWidth(endpoint, id, width));
  },
  sortAscending(endpoint, columnId, isSortedAsc=false) {
    if (isSortedAsc) return dispatch(sortRemove(endpoint, columnId));
    return dispatch(sortAscending(endpoint, columnId));
  },
  sortDescending(endpoint, columnId, isSortedDesc=false) {
    if (isSortedDesc) return dispatch(sortRemove(endpoint, columnId));
    return dispatch(sortDescending(endpoint, columnId));
  },
  removeSorting(endpoint, columnId) {
    return dispatch(sortRemove(endpoint, columnId));
  },
  handleRowClick(endpoint, row) {

  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

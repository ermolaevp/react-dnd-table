import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

const { _t } = tiasUtils

// Widgets
import Cell from './widgets/cell'

// Actions
import dataFetch from '../../modules/endpoints/actions/data_fetch'
import filterUpdate from '../../modules/endpoints/actions/filter_update'
import filterReplace from '../../modules/endpoints/actions/filter_replace'
import filterSet from '../../modules/endpoints/actions/filter_set'
import pageSet from '../../modules/endpoints/actions/page_set'
import filterRemove from '../../modules/endpoints/actions/filter_remove'
import incidentSelect from '../../modules/endpoints/actions/incident_select'
import activeTabSet from '../../modules/active_tab/actions/active_tab_set'

const saveIdToLocalStorage = (id) => {
  let ids = []
  if (localStorage.hasOwnProperty('viewed_incidents_ids')) {
    ids = JSON.parse(localStorage.getItem('viewed_incidents_ids'))
  }
  if (ids.indexOf(id) !== -1) return // there is already one
  if (ids.length > 1000) ids.shift() // ids list length limited to 1000
  ids.push(id)
  localStorage.setItem('viewed_incidents_ids', JSON.stringify(ids));
}

const mapStateToProps = ({ date_range, endpoints, attributes }, { endpoint }) => {
  const { data, params, isFetching } = endpoints[endpoint]
  return {
    data: data._items,
    params,
    columns: _(attributes[endpoint]).select(attr => attr.visibility === true),
    endpoint,
    isFetching,
    date_range,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleRowClick(row, endpoint, isSameRow, params) {
      if ('fired_signatures_dst' === endpoint || 'fired_signatures_src' === endpoint) {
        dispatch(pageSet('events', 1))

        const filter = {
          logdate: { $gte: params.filter.$from, $lte: params.filter.$to },
          rule: {
            $options: 'i',
            $regex: row.rule
          }
        }
        if ('fired_signatures_dst' === endpoint) filter.dst = row.address.ip
        if ('fired_signatures_src' === endpoint) filter.src = row.address.ip
        if (!!params.filter.group) filter.group = params.filter.group
        if (!!params.filter.sensor_ip) filter.sensor_ip = params.filter.sensor_ip
        if (!!params.filter.rule) filter.rule = params.filter.rule
        if (!!params.filter.proto) filter.proto = params.filter.proto

        if (isSameRow) {
          dispatch(filterReplace('events', { logdate: { $gte: params.filter.$from, $lte: params.filter.$to } }))
        } else {
          dispatch(filterReplace('events', filter))
        }
      }
      if ('events' === endpoint) {
        const logdate = new Date(row.logdate);
        const logTime = {
          '$gte': moment(logdate).subtract(300, 'seconds').toDate(),
          '$lte': moment(logdate).add(300, 'seconds').toDate()
        }
        // if (row.homenet_address.indexOf(row.src) === -1) {
        //   dispatch(filterReplace('firewall', {logTime, SourceIP: row.src}));
        //   dispatch(filterReplace('webproxy', {logTime, ClientIP: row.src}));
        // } else if (row.homenet_address.indexOf(row.dst) === -1) {
        //   dispatch(filterReplace('firewall', {logTime, DestinationIP: row.dst}));
        //   dispatch(filterReplace('webproxy', {logTime, DestHostIP: row.dst}));
        // }
        if (row.src === '91.244.183.5') {
          dispatch(filterReplace('webproxy', {logTime, DestHostIP: row.dst}));
          dispatch(filterReplace('firewall', {logTime, DestinationIP: row.dst}));
        }
        if (row.src === '10.0.4.245') {
          dispatch(filterReplace('webproxy', {logTime, ClientIP: row.dst}));
          dispatch(filterReplace('firewall', {logTime, SourceIP: row.dst}));
        }
        if (row.dst === '91.244.183.5') {
          dispatch(filterReplace('webproxy', {logTime, DestHostIP: row.src}));
          dispatch(filterReplace('firewall', {logTime, DestinationIP: row.src}));
        }
        if (row.dst === '10.0.4.245') {
          dispatch(filterReplace('webproxy', {logTime, ClientIP: row.src}));
          dispatch(filterReplace('firewall', {logTime, SourceIP: row.src}));
        }
      }
      if ('incidents' === endpoint) {
        saveIdToLocalStorage(row._id)
        dispatch(incidentSelect(row._id))
        dispatch(activeTabSet(1)) // go to the incident tab
      }
    },
    handleDateRangeChange(endpoint, date_range) {
      switch (endpoint) {
      case 'fired_signatures_dst':
      case 'fired_signatures_src':
        dispatch(filterUpdate(endpoint, {$from: date_range.from, $to: date_range.to}))
        break
      case 'incidents':
        dispatch(filterSet('incidents', 'created', {$gte: date_range.from,$lte: date_range.to}))
        break
      case 'events':
        dispatch(filterSet('events', 'logdate', {$gte: date_range.from,$lte: date_range.to}))
        break
      default:
        break
      }
    },

  }
}

const EmptyTable = ({ colSpan }) => {
  return(
    <tbody>
      <tr>
        <td colSpan={colSpan}>{_t('No results found')}.</td>
      </tr>
    </tbody>
  )
}

class TableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowIndex: null
    }
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.params) !== JSON.stringify(this.props.params)) {
      return this.props.handleDataFetch(nextProps.endpoint, nextProps.params);
    }
    if (JSON.stringify(nextProps.date_range) !== JSON.stringify(this.props.date_range)) {
      return this.props.handleDateRangeChange(nextProps.endpoint, nextProps.date_range)
    }
    if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
      this.state.rowIndex = null;
    }
  }
  render() {
    const {
      data,
      params,
      columns,
      endpoint,
      isFetching,
      handleRowClick,
      hasOpenedMenus,
    } = this.props;

    if (data.length === 0) return <EmptyTable colSpan={columns.length}/>

    let ids = []
    if (endpoint === 'incidents' && localStorage.hasOwnProperty('viewed_incidents_ids')) {
      ids = JSON.parse(localStorage.getItem('viewed_incidents_ids'))
    }


});
    return
}

export default connect(mapStateToProps, mapDispatchToProps)(TableBody)

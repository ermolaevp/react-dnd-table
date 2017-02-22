'use strict'

var moment = require('moment');
var period = 15 * 60 * 1000; // 15 min
var dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

module.exports = {
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  InitalConstants: {
    PERIOD: period
  },
  ItemTypes: {
    COLUMN_TITLE: 'column_title',
    COLUMN_RESIZER: 'column_resizer'
  },
  InitalAttributes: {
    EVENT_ATTRIBUTES: [
      {id: 'logdate',   name: 'logdate',   type: 'datetime', filter_type: 'datetime', visibility: true },
      {id: 'sig_text',  name: 'sig_text',  type: 'string',   filter_type: 'string',   visibility: true, width: '20%' },
      {id: 'rule',      name: 'rule',      type: 'link',     filter_type: 'string',   visibility: true },
      {id: 'src',       name: 'src',       type: 'string',   filter_type: 'string',   visibility: true },
      {id: 'spt',       name: 'spt',       type: 'number',   filter_type: 'number',   visibility: true },
      {id: 'dst',       name: 'dst',       type: 'string',   filter_type: 'string',   visibility: true },
      {id: 'dpt',       name: 'dpt',       type: 'number',   filter_type: 'number',   visibility: true },
      {id: 'proto',     name: 'proto',     type: 'string',   filter_type: 'subset',   visibility: false },
      {id: 'priority',  name: 'priority',  type: 'string',   filter_type: 'subset',   visibility: true },
      {id: 'group',    name: 'group',      type: 'string',   filter_type: 'subset',   visibility: true },
      {id: 'sensor_ip', name: 'sensor_ip', type: 'string',   filter_type: 'subset',   visibility: true },
      {id: 'event_id',  name: 'event_id',  type: 'string',   filter_type: 'string',   visibility: false },
      {id: 'pcap',      name: 'pcap',      type: 'link',     filter_type: 'string',   visibility: true },
    ],
    INCIDENT_ATTRIBUTES: [
      { id: 'created',   name: 'created',   type: 'datetime', filter_type: 'datetime', visibility: true },
      { id: 'level',     name: 'level',     type: 'number',   filter_type: 'number',   visibility: true },
      { id: 'affected_actives',             type: 'array',    filter_type: 'string',   visibility: true },
      { id: 'mode',      name: 'mode',      type: 'string',   filter_type: 'string',   visibility: true },
      { id: 'title',     name: 'title',     type: 'string',   filter_type: 'string',   visibility: true },
      { id: 'summary',   name: 'summary',   type: 'string',   filter_type: 'string',   visibility: true, width: '50%' },
    ],
    FIRED_SIGNATURES_SRC_ATTRIBUTES: [
      { id: 'sig_text',        name: 'sig_text',        type: 'string', filter_type: 'string', visibility: true, width: '20%' },
      { id: 'address',         name: 'address',         type: 'with_homenet', filter_type: 'string', visibility: true },
      { id: 'rule',            name: 'rule',            type: 'link',   filter_type: 'string', visibility: false },
      { id: 'priority',        name: 'priority',        type: 'string', filter_type: 'subset', visibility: true },
      { id: 'group',           name: 'group',           type: 'string', filter_type: 'subset', visibility: true },
      { id: 'proto',           name: 'proto',           type: 'string', filter_type: 'subset', visibility: true, width: '50px' },
      { id: 'sensor_ip',       name: 'sensor_ip',       type: 'string', filter_type: 'subset', visibility: false },
      { id: 'count',           name: 'count',           type: 'number', filter_type: 'number', visibility: true, width: '100px' },
    ],
    FIRED_SIGNATURES_DST_ATTRIBUTES: [
      { id: 'sig_text',        name: 'sig_text',        type: 'string', filter_type: 'string', visibility: true, width: '20%' },
      { id: 'address',         name: 'address',         type: 'with_homenet', filter_type: 'string', visibility: true },
      { id: 'rule',            name: 'rule',            type: 'link',   filter_type: 'string', visibility: false },
      { id: 'priority',        name: 'priority',        type: 'string', filter_type: 'subset', visibility: true },
      { id: 'group',           name: 'group',           type: 'string', filter_type: 'subset', visibility: true },
      { id: 'proto',           name: 'proto',           type: 'string', filter_type: 'subset', visibility: true, width: '50px' },
      { id: 'sensor_ip',       name: 'sensor_ip',       type: 'string', filter_type: 'subset', visibility: false },
      { id: 'count',           name: 'count',           type: 'number', filter_type: 'number', visibility: true, width: '100px' },
    ],
    FIREWALL_ATTRIBUTES: [
      { id: "logTime",             type: "datetime", filter_type: 'datetime', visibility: true },
      { id: "ClientUserName",      type: "string",   filter_type: 'string', visibility: true },
      { id: "SourceIP",            type: "string",   filter_type: 'string', visibility: true },
      { id: "OriginalClientIP",    type: "string",   filter_type: 'string', visibility: false },
      { id: "SourcePort",          type: "number",   filter_type: 'number', visibility: true },
      { id: "DestinationName",     type: "string",   filter_type: 'string', visibility: false },
      { id: "DestinationIP",       type: "string",   filter_type: 'string', visibility: true },
      { id: "DestinationPort",     type: "number",   filter_type: 'number', visibility: true },
      { id: "protocol",            type: "string",   filter_type: 'string', visibility: false },
      { id: "ClientAgent",         type: "string",   filter_type: 'string', visibility: true },
      { id: "ApplicationProtocol", type: "string",   filter_type: 'string', visibility: true },
      { id: "FwcAppPath",          type: "string",   filter_type: 'string', visibility: true },
      { id: "Action",              type: "number",   filter_type: 'number', visibility: true },
      { id: "resultcode",          type: "number",   filter_type: 'number', visibility: true },
      { id: "bytessent",           type: "number",   filter_type: 'number', visibility: true },
      { id: "bytesrecvd",          type: "number",   filter_type: 'number', visibility: true },
      { id: "connectiontime",      type: "number",   filter_type: 'number', visibility: true },
      { id: "sessionid",           type: "number",   filter_type: 'number', visibility: false },
      { id: "NATAddress",          type: "string",   filter_type: 'string', visibility: false },
      { id: "servername",          type: "string",   filter_type: 'string', visibility: false },
    ],
    WEBPROXY_ATTRIBUTES: [
      { id: 'logTime',        type: 'datetime', filter_type: 'datetime', visibility:  true },
      { id: 'ClientUserName', type: 'string',   filter_type: 'string', visibility:  true },
      { id: 'ClientIP',       type: 'string',   filter_type: 'string', visibility:  true },
      { id: 'SrcPort',        type: 'number',   filter_type: 'number', visibility:  true },
      { id: 'DestHostIP',     type: 'string',   filter_type: 'string', visibility:  true },
      { id: 'DestHostPort',   type: 'number',   filter_type: 'number', visibility:  true },
      { id: 'DestHost',       type: 'string',   filter_type: 'string', visibility:  false },
      { id: 'uri',            type: 'string',   filter_type: 'string', visibility:  true },
      { id: 'operation',      type: 'string',   filter_type: 'string', visibility:  true },
      { id: 'mimetype',       type: 'string',   filter_type: 'string', visibility:  true },
      { id: 'protocol',       type: 'string',   filter_type: 'string', visibility:  true },
      { id: 'transport',      type: 'string',   filter_type: 'string', visibility:  false },
      { id: 'resultcode',     type: 'number',   filter_type: 'number', visibility:  true },
      { id: 'ClientAgent',    type: 'string',   filter_type: 'string', visibility:  true },
      { id: 'bytesrecvd',     type: 'number',   filter_type: 'number', visibility:  true },
      { id: 'bytessent',      type: 'number',   filter_type: 'number', visibility:  true },
      { id: 'processingtime', type: 'number',   filter_type: 'number', visibility:  true },
      { id: 'referredserver', type: 'string',   filter_type: 'string', visibility:  false },
      { id: 'servername',     type: 'string',   filter_type: 'string', visibility:  false },
    ]
  },
}

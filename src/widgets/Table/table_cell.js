import React from 'react'
import moment from 'moment'

const style = {}

const CopyIcon = ({ children }) => (
  <i
    className="material-icons copy-to-clipboard"
    title={_t("Copy")}
    onClick={(e) =>{
      e.stopPropagation()
      window.prompt(_t("Ctrl+C, Enter"), children)
    }}
  >content_copy</i>
)

const TdCell = ({ type, children }) => <td className={type}>{children}</td>
const LinkCell = ({ type, link, children }) => <TdCell type={type}><a href={link} title={link} target="_blank" onMouseUp={e => e.stopPropagation()}>{children}</a></TdCell>
const DateTimeCell = ({ type, children }) => <TdCell type={type}><span title={_f(new Date(children))}>{_f(new Date(children))}</span></TdCell>
const StringCell = ({ type, children }) => <TdCell type={type}><span title={children}>{children}</span></TdCell>
const WithHomnetIcon = ({ type, children }) => <TdCell type={type}><span title={children}>{children}&nbsp;<i className="material-icons">home</i></span></TdCell>

const Cell = ({ id, type, width, children }) => {
  // prepare
  if ('priority,direction,group'.split(',').indexOf(id) !== -1) children = _t(children, 'for_tables')
  if (id === 'affected_actives' && Array.isArray(children)) children = children.map(a => a.ip)
  if (Array.isArray(children)) children = children.join(', ')
  if (type === 'with_homenet' && !children.in_homenet) children = children.ip
  // fire!
  if (type === 'with_homenet' && children.in_homenet) return <WithHomnetIcon type={type}>{children.ip}</WithHomnetIcon>
  if (id === 'rule') return <LinkCell type={type} link={`/api/rules/${children}`}>{children}</LinkCell>
  if (id === 'pcap') return <LinkCell type={type} link={children}><i className="material-icons">file_download</i></LinkCell>
  if (type === 'datetime') return <DateTimeCell type={type}>{children}</DateTimeCell>
  if (type === 'link') return <LinkCell type={type} title={children}>{children}</LinkCell>

  return  <StringCell type={type}>{typeof children === 'string' ? children : JSON.stringify(children)}</StringCell>
}

export default Cell

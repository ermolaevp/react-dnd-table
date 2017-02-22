import React from 'react'
const { _t } = tiasUtils

const ActionButtons = ({ onSubmit, onReset }) => (
  <div className="action-buttons">
    <button className="hidden">submit</button>
    <div className="dd-menu-item text-right">
      <a className="action-link" href="javascript:void(0)" onClick={onReset}>{_t('Reset')}</a>
      <a className="action-link" href="javascript:void(0)" onClick={onSubmit}>{_t('Ok')}</a>
    </div>
  </div>
)

export default ActionButtons

import React, { PropTypes } from 'react';

const ActionButtons = ({ onSubmit, onReset }) => (
  <div className="action-buttons">
    <div className="dd-menu-item text-right">
      <button onClick={onReset}>Reset</button>
      <button onClick={onSubmit}>Ok</button>
    </div>
  </div>
);

ActionButtons.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default ActionButtons;

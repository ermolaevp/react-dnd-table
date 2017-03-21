import React, { PropTypes } from 'react';

const ActionButtons = ({ onSubmit, onReset }) => (
  <div className="FilterForm-ActionButtons">
    <button onClick={onReset}>Reset</button>
    <button onClick={onSubmit}>Ok</button>
  </div>
);

ActionButtons.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default ActionButtons;

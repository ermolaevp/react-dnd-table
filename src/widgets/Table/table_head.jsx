import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class TableHead extends Component {
  render() {
    return <thead>{this.props.children}</thead>;
  }
}

export default DragDropContext(HTML5Backend)(TableHead);

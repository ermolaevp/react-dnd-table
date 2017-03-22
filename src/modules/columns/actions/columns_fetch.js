// Actions
import columnsReceive from './columns_receive';

export default function columnsFetch(endpoint) {
  return dispatch =>
    fetch(`https://react-dnd-table-api.herokuapp.com/columns/${endpoint}.json`)
      .then(response => response.json())
      .then(json => dispatch(columnsReceive(endpoint, json.columns)))
      .catch(ex => console.log('parsing failed', ex));
}

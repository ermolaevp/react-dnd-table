// Actions
import columnsReceive from './columns_receive';

export default function columnsFetch(endpoint) {
  return dispatch =>
    fetch(`http://localhost:3000/columns/${endpoint}.json`)
      .then(response => response.json())
      .then(json => dispatch(columnsReceive(endpoint, json.columns)))
      .catch(ex => console.log('parsing failed', ex));
}

// Actions
import dataReceive from './data_receive';

export default function dataFetch(endpoint, params = {}) {
  return dispatch =>
    fetch(`https://react-dnd-table-api.herokuapp.com/${endpoint}/search.json`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Origin': '*',
      },
      body: JSON.stringify(params),
    })
      .then(response => response.json())
      .then(json => dispatch(dataReceive(endpoint, json)))
      .catch(ex => console.log('parsing failed', ex));
}

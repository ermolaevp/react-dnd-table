// Actions
import dataReceive from './data_receive';

export default function dataFetch(endpoint, params = {}) {
  return dispatch =>
    fetch(`http://178.159.39.86:3000/${endpoint}/search.json`, {
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

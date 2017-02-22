/*
 * Parse form input values with callback function into name:value object
 */
export const parseFormValues = (form, parseFn) => {
  const _values = {};
  for (let element in form.elements) {
    let el = form.elements[element];
    if ('INPUT' === el.nodeName && 'undefined' === typeof _values[el.name]) {
      _values[el.name] = parseFn(el.value);
    }
  }
  return _values;
}

export const getRangeFilter = ($gte, $lte) => {
  if ($gte || $lte) {
    const _filter = { $gte, $lte };
    if (!$gte) delete _filter['$gte'];
    if (!$lte) delete _filter['$lte'];
    return _filter;
  }
  return false;
}

export const clearForm = (form, ...skip) => {
  for (let element in form.elements) {
    if ('INPUT' === form.elements[element].nodeName
      && skip.indexOf(form.elements[element].name) === -1)
    {
       form.elements[element].value = '';
    }
  }
}
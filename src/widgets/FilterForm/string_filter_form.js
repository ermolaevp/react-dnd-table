import React, { Component, PropTypes } from 'react'
import ActionButtons from './action_buttons'
import { parseFormValues, clearForm } from './utils'
const { _t } = tiasUtils

class StringFilterForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      input_value: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onReset = this.onReset.bind(this)
  }
  fillForm(filter) {
    let input_value = ''
    if (typeof filter === 'string') input_value = filter
    if (typeof filter === 'object'
      && typeof filter.$regex !== 'undefined') input_value = filter.$regex
    this.setState({ input_value })
  }
  initForm() {
    this.fillForm(this.props.filter)
    if (this.form) this.form.input_value.focus()
  }
  componentDidMount() {
    this.initForm()
  }
  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps.filter) !== JSON.stringify(this.props.filter)) {
      this.fillForm(nextProps.filter)
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const { input_value } = this.state
    if (input_value === '') return false
    return this.props.onSubmit({
      '$regex': input_value,
      '$options': 'i'
    })
    // return this.props.onSubmit({
    //   '$text': {
    //     '$search': value
    //   }
    // })
  }
  onReset() {
    clearForm(this.form)
    this.props.onReset()
  }
  handleOnChange(e) {
    let { name, value } = e.currentTarget
    this.setState({ input_value: value.trim() })
  }
  render() {
    if (this.form) this.form.input_value.focus()
    return (
      <form
        ref={node => this.form = node}
        onSubmit={this.onSubmit}
      >
        <div className="dd-menu-item--filter">
          <input
            name="input_value"
            value={this.state.input_value}
            placeholder={_t("Search")}
            onChange={this.handleOnChange}
          />
        </div>
        <div>
          <ul className="regex-hints">
            <li><p>{_t("Regex hints")}:</p></li>
            <li><strong>^</strong> начало строки</li>
            <li><strong>$</strong> конец строки</li>
            <li><strong>str</strong> подстрока</li>
            <li><strong>^str$</strong> точное совпадение</li>
            <li><strong>(a|b)</strong> a или b</li>
            <li><strong>[^abc]</strong> кроме a или b или c</li>
            <li><p><a href="https://www.cheatography.com/davechild/cheat-sheets/regular-expressions/" target="_blank">{_t('more')}...</a></p></li>
          </ul>
        </div>
        <ActionButtons onSubmit={this.onSubmit} onReset={this.onReset} />
      </form>
    )
  }
}

export default StringFilterForm;

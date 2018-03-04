import React, { Component } from 'react';
import { Control, Errors } from 'react-redux-form';
import PropTypes from 'prop-types';

import { FormGroup, InputGroup, Glyphicon, ControlLabel, Checkbox } from 'react-bootstrap';


class LoginField extends Component {
  state = {
    pristine: true,
    valid: null,
    checked: false,
    currentValue: ''
  }

  handleChange = e => {
    this.setState({ pristine: false, valid: e.target.value.length, currentValue: e.target.value });
  }

  handleChecked = e => {
    this.setState({ checked: e.target.checked });
  }

  validateEmail = val =>
    this.props.model !== '.email' || !val.length || (val && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val))


  render(){
    const { label, glyph, model, checkbox } = this.props, { pristine, valid, currentValue } = this.state;
    return(
      <div className="LoginField field">
        <FormGroup>
          <ControlLabel className="LoginField-label">{label}</ControlLabel>
          <InputGroup>
            <InputGroup.Addon>
              <Glyphicon glyph={glyph} />
            </InputGroup.Addon>
            <Control.text
              model={model}
              type={model === '.passwort' && !this.state.checked ? 'password' : 'text'}
              validators={{
                valueMissing: val => val && val.length,
                validEmail: val => this.validateEmail(val)
              }}
              validateOn="change"
              onChange={this.handleChange}
              className={`LoginField-input form-control ${pristine ? '' : model === '.email' && currentValue.length && this.validateEmail(currentValue) ? '' : valid ? '' : 'LoginField-input-error'}`}
            />
            {checkbox &&
            <InputGroup.Addon>
              <input type="checkbox" onChange={this.handleChecked}/> Anzeigen
            </InputGroup.Addon>}
          </InputGroup>
          <Errors
            className="LoginField-error-message"
            model={model}
            show={!pristine}
            messages={{
              valueMissing: 'muss ausgefüllt werden',
              validEmail: 'Invalid email address',
            }}
          />
        </FormGroup>
      </div>
    )
  }
}


export default LoginField;

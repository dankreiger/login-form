import React, { Component } from 'react';
import { Control, Errors } from 'react-redux-form';

import { FormGroup, InputGroup, Glyphicon, ControlLabel } from 'react-bootstrap';


class LoginField extends Component {
  state = {
    pristine: true,
    valid: null,
    checked: false,
  }

  handleChange = e => {
    this.setState({ pristine: false, valid: this.props.model === '.email' ? e.target.value.length && this.validateEmail(e.target.value) : e.target.value.length });
  }

  handleChecked = e => {
    this.setState({ checked: e.target.checked });
  }

  handleFocus = e => {
    e.target.setSelectionRange(0, e.target.value.length)
  }

  validateEmail = val =>
    this.props.model !== '.email' || !val.length || (val && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val))


  render(){
    const { submitFailed, label, glyph, model, checkbox } = this.props, { pristine, valid } = this.state;
    return(
      <div className="LoginField field">
        <FormGroup className="LoginForm-group">
          <ControlLabel className="LoginField-label">{label}</ControlLabel>
          <InputGroup>
            <InputGroup.Addon>
              <Glyphicon glyph={glyph} />
            </InputGroup.Addon>
            <Control.text
              model={model}
              onFocus={this.handleFocus}
              type={model === '.passwort' && !this.state.checked ? 'password' : 'text'}
              validators={{
                validateNotEmpty: val => val && val.length,
                validEmail: val => this.validateEmail(val)
              }}
              validateOn="change"
              onChange={this.handleChange}
              className={`LoginField-input form-control ${!submitFailed && pristine ? '' : valid ? '' : 'LoginField-input-error'}`}
            />
            {checkbox &&
            <InputGroup.Addon>
              <input type="checkbox" className="LoginField-anzeigen" onChange={this.handleChecked}/> Anzeigen
            </InputGroup.Addon>}
          </InputGroup>
          <Errors
            className="LoginField-error-message"
            model={model}
            show={submitFailed || !pristine}
            messages={{
              validateNotEmpty: 'muss ausgefüllt werden',
              validEmail: 'ungültige E-Mail-Adresse',
            }}
          />
        </FormGroup>
      </div>
    )
  }
}


export default LoginField;

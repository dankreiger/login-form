import React, { Component } from 'react';
import { Control, Errors } from 'react-redux-form';

import { FormGroup, InputGroup, Glyphicon, ControlLabel, Checkbox } from 'react-bootstrap';


class LoginField extends Component {
  state = {
    pristine: true,
    valid: null,
    checked: false
  }

  handleChange = (e) => {
    this.setState({ pristine: false, valid: e.target.value.length });
  }

  handleChecked = (e) => {
    this.setState({ checked: e.target.checked });
  }

  render(){
    const { label, glyph, model, checkbox } = this.props;
    const { pristine, valid } = this.state;
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
              required
              validators={{
                // maxLength: (val) => val.length < 15,
                required: val => val && val.length
              }}
              validateOn="change"
              onChange={this.handleChange}
              className={`LoginField-input form-control ${pristine || valid ? '' : 'LoginField-input-error'}`}
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
              // maxLength: 'Must be 15 characters or less'
            }}
          />
        </FormGroup>
      </div>
    )
  }
}



export default LoginField;

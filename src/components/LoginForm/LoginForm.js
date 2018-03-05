import React, { Component } from 'react';
import { Control, Form } from 'react-redux-form';
import { FormGroup, Checkbox, Button } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

import LoginField from './LoginField';
import './LoginForm.css';

const fields = [
  {label: 'vorname', glyph: 'user', model: '.vorname'},
  {label: 'nachname', glyph: 'user', model: '.nachname'},
  {label: 'mitgliedsname', glyph: 'user', model: '.mitgliedsname'},
  {label: 'email', glyph: 'user', model: '.email'},
  {label: 'passwort', glyph: 'user', model: '.passwort', checkbox: true},

]

class LoginForm extends Component {
  state = { submitFailed: false, tocAccepted: false }

  handleChangeChk = e => {
    this.setState({tocAccepted: e.target.checked});
  }
  handleClick = e => {
    e.preventDefault();
    let formData = new FormData(document.forms[0]);
    for (var pair of formData.entries()) {
      if(!pair[1]){
        this.setState({submitFailed: true});
        break;
      }
    }
    if(!this.state.tocAccepted) {
      this.setState({submitFailed: true});
    } else {
      this.setState({submitFailed: false});
      document.forms[0].submit();
    }
  }

  render() {
    const {submitFailed, tocAccepted} = this.state;
    return(
      <Form
        className="LoginForm"
        model="user"
        onSubmit={v => alert(`Formular wurde erfolgreich übermittelt\n: ${JSON.stringify(v, null, 4)}`)}>
        <Button className="LoginForm-facebook-btn" type="button" >
          <i className="fa fa-facebook"></i>
          Über Facebook registrieren
        </Button>
        <div className="LoginForm-separator background"><span>oder ohne facebook</span></div>
        {fields.map(field =>
          <LoginField
            key={field.label}
            label={field.label}
            glyph={field.glyph}
            model={field.model}
            checkbox={field.checkbox}
            submitFailed={submitFailed}
          />
        )}
        <FormGroup>
          <Checkbox className="LoginForm-terms-and-conditions" name="terms-and-conditions" onChange={this.handleChangeChk}>
            Ich willige in die Verarbeitung und Nutzung meiner Daten gemäß der Datenschutzerklärung ein.
          </Checkbox>
          {submitFailed && !tocAccepted &&
            <div className="LoginForm-terms-and-conditions-error-message">
              * Sie müssen die Nutzungsbedingungen akzeptieren
            </div>
          }
        </FormGroup>
        <Button bsStyle='success' className="LoginForm-submit" type="button" onClick={this.handleClick}>
          Submit
        </Button>
      </Form>
    )
  }
}





export default LoginForm;

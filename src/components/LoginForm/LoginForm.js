import React, { Component } from 'react';
import { Control, Form } from 'react-redux-form';
import { FormGroup, Checkbox, Button } from 'react-bootstrap';

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
  state = { submitFailed: false }

  handleClick = e => {
    e.preventDefault();
    let formData = new FormData(document.forms[0]);
    for (var pair of formData.entries()) {
      if(!pair[1]){
        this.setState({submitFailed: true});
        break;
      }
    }
    document.forms[0].submit();
  }

  render() {
    return(
      <Form
        className="LoginForm"
        model="user"
        onSubmit={v => alert(`Formular wurde erfolgreich übermittelt\n: ${JSON.stringify(v, null, 4)}`)}>

        {fields.map(field =>
          <LoginField
            key={field.label}
            label={field.label}
            glyph={field.glyph}
            model={field.model}
            checkbox={field.checkbox}
            submitFailed={this.state.submitFailed}
          />
        )}
        <FormGroup>
          <Checkbox className="LoginForm-terms-and-conditions">
            Ich willige in die Verarbeitung und Nutzung meiner Daten gemäß der Datenschutzerklärung ein.
          </Checkbox>
        </FormGroup>
        <Button bsStyle='success' type="button" onClick={this.handleClick}>
          Submit
        </Button>
      </Form>
    )
  }
}





export default LoginForm;

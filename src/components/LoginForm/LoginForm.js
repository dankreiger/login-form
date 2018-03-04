import React from 'react';
import { Control, Form } from 'react-redux-form';
import { FormGroup, Checkbox} from 'react-bootstrap';

import LoginField from './LoginField';
import './LoginForm.css';

const fields = [
  {label: 'vorname', glyph: 'user', model: '.vorname'},
  {label: 'nachname', glyph: 'user', model: '.nachname'},
  {label: 'mitgliedsname', glyph: 'user', model: '.mitgliedsname'},
  {label: 'email', glyph: 'user', model: '.email'},
  {label: 'passwort', glyph: 'user', model: '.passwort', checkbox: true},

]

const LoginForm = () => {
  return(
    <Form className="LoginForm" model="user" onSubmit={v => alert(JSON.stringify(v, null, 4))}>
      {fields.map(field =>
        <LoginField
          key={field.label}
          label={field.label}
          glyph={field.glyph}
          model={field.model}
          checkbox={field.checkbox}
        />
      )}
      <FormGroup>
        <Checkbox className="LoginForm-terms-and-conditions">
          Ich willige in die Verarbeitung und Nutzung meiner Daten gemäß der Datenschutzerklärung ein.
        </Checkbox>
      </FormGroup>
      <button type="submit">
        Submit
      </button>
      <Control.reset model="user" className="secondary">
        Clear Values
      </Control.reset>
    </Form>
  )
}




export default LoginForm;

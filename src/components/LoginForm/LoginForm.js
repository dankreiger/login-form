import React, { Component } from 'react';
import { Form } from 'react-redux-form';
import { FormGroup, Checkbox, Button } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import $ from 'jquery';

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
    // notify user by shaking the form if submission has failed

    let inputsErrors = document.querySelectorAll('.LoginField-input-error');
    console.log(this.state.submitFailed)
    if(this.state.submitFailed || inputsErrors.length || !this.state.tocAccepted){
      this.setState({submitFailed: true});
      this.shakeForm();
    }
    else {
      this.setState({submitFailed: false});
      document.forms[0].submit();
    }
  }

  shakeForm = () => {
    $('form').addClass('shakeForm')
    $('form').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
      $('form').delay(200).removeClass('shakeForm');
    });
  }

  responseFacebook = (response) => {
    console.log(response);
  }

  render() {
    const {submitFailed, tocAccepted} = this.state;
    return(
      <Form
        className="LoginForm"
        model="user"
        onSubmit={v => alert(`Formular wurde erfolgreich übermittelt\n ${JSON.stringify(v, null, 4)}`)}>
        <FacebookLogin
          appId="9999999999999999"
          autoLoad
          callback={this.responseFacebook}
          render={renderProps => (
            <Button className="LoginForm-facebook-btn" type="button" onClick={renderProps.onClick}>
              <i className="fb-icon fa fa-facebook"></i>
              Über Facebook registrieren
            </Button>
          )}
        />

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
        <Button className="LoginForm-submit" type="button" onClick={this.handleClick}>
          Submit
        </Button>
      </Form>
    )
  }
}





export default LoginForm;

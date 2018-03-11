import React from 'react';
import {shallow} from 'enzyme';
import LoginForm from '../LoginForm';

let loginform;
beforeEach(() => {
  loginform = shallow(<LoginForm />);
});


it('renders without crashing', () => {
  expect(loginform).toMatchSnapshot();
});

it('has five 5 input fields', () => {
  expect(loginform.find('LoginField').length).toEqual(5)
});

it('does not submit if no fields are filled in', () => {
  expect(loginform.state().submitFailed).toBe(false);
  expect(loginform.state().tocAccepted).toBe(false)

  // submit form
  loginform.find('.LoginForm-submit').simulate('click', { preventDefault() {} });
  expect(loginform.state().submitFailed).toBe(true);
  expect(loginform.state().tocAccepted).toBe(false);
});


it('does not submit if there is an invalid e-mail address entered', () => {
  expect(loginform.state().submitFailed).toBe(false)
  expect(loginform.state().tocAccepted).toBe(false)
  // fill in fields

  loginform.find('LoginField').map(field => {
    field.value = 'some text'
  });

  // submit form
  loginform.find('.LoginForm-submit').simulate('click', { preventDefault() {} });
  expect(loginform.state().submitFailed).toBe(true);
});

import React from 'react';
import {shallow} from 'enzyme';
import LoginForm from '../LoginForm';

const loginform = shallow(<LoginForm />);

it('renders without crashing', () => {
  expect(loginform).toMatchSnapshot();
});

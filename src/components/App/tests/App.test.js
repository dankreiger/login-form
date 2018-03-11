import React from 'react';
import {shallow} from 'enzyme';
import App from '../App';

let app;
beforeEach(() => {
  app = shallow(<App />);
});

it('renders without crashing', () => {
  expect(app).toMatchSnapshot();
});

it('renders <LoginForm /> component', () => {
  expect(app.text()).toEqual("<LoginForm />");
});

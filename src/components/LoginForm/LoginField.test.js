import React from 'react';
import {shallow} from 'enzyme';
import LoginField from './LoginField';

const loginfield = shallow(<LoginField glyph='user' />);

it('renders without crashing', () => {
  expect(loginfield).toMatchSnapshot();
});

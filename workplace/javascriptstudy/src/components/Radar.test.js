import React from 'react';
import ReactDOM from 'react-dom';
import Radar from './Radar';
import Enzyme from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Radar />, div);
});
test("radar", () => {
  const props = {};
  const arr = []
  const wrapper = Enzyme.shallow(<Radar {...props} />);
  let action = wrapper.instance().radar(arr);
  expect(action).toEqual(arr);
});
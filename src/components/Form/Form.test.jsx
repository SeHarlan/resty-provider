import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import RestyProvider from '../../RestyProvider';

describe('Form component', () => {
  it('renders Form', () => {
    const wrapper = shallow(
      <RestyProvider>
        <Form />
      </RestyProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

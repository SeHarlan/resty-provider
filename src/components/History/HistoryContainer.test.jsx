import React from 'react';
import { shallow } from 'enzyme';
import HistoryContainer from './HistoryContainer';
import RestyProvider from '../../RestyProvider';

describe('HistoryContainer component', () => {
  it('renders HistoryContainer', () => {
    const wrapper = shallow(
      <RestyProvider>
        <HistoryContainer />
      </RestyProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

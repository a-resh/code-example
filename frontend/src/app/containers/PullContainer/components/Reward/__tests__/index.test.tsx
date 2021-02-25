import * as React from 'react';
import { render } from '@testing-library/react';

import { Reward } from '../index';

describe('<Reward  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <Reward totem={'fox'} allPayouts={15000} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

import * as React from 'react';
import { render } from '@testing-library/react';

import { Reward } from '..';

describe('<Reward  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Reward />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

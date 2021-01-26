import * as React from 'react';
import { render } from '@testing-library/react';

import { AccountRewards } from '../index';

describe('<AccountRewards  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<AccountRewards />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

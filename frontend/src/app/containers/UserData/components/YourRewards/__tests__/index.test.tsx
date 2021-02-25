import * as React from 'react';
import { render } from '@testing-library/react';

import { YourRewards } from '..';

describe('<YourReward  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<YourRewards stakes={[]} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

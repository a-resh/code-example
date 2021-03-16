import * as React from 'react';
import { render } from '@testing-library/react';

import { YourRewards } from '..';

describe('<YourReward  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <YourRewards stakes={[]} payout={() => {}} btcLastPrice={1} tokenPrice={1} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

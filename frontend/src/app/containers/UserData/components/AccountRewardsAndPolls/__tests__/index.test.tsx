import * as React from 'react';
import { render } from '@testing-library/react';

import { AccountRewardsAndPools } from '../index';

describe('<AccountRewards  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <AccountRewardsAndPools rewards={[]} payout={() => {}} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

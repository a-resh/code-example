import * as React from 'react';
import { render } from '@testing-library/react';

import { PoolInfo } from '../index';

describe('<PoolInfo  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<PoolInfo showModal={() => {}} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

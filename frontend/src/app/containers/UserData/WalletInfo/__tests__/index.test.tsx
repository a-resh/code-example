import * as React from 'react';
import { render } from '@testing-library/react';

import { WalletInfo } from '../index';

describe('<WalletInfo  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<WalletInfo />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

import * as React from 'react';
import { render } from '@testing-library/react';

import { ConnectButton } from '../index';

describe('<LoginButton  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <ConnectButton onConnectWallet={() => {}} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

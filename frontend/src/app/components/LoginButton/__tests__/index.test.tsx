import * as React from 'react';
import { render } from '@testing-library/react';

import { LoginButton } from '../index';

describe('<LoginButton  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<LoginButton />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

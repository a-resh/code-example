import * as React from 'react';
import { render } from '@testing-library/react';

import { ActivePools } from '..';

describe('<ActivePools  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ActivePools stakes={[]} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

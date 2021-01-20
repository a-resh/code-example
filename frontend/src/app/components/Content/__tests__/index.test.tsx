import * as React from 'react';
import { render } from '@testing-library/react';

import { Content } from '..';

describe('<Content  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Content />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

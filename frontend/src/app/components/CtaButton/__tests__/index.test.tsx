import * as React from 'react';
import { render } from '@testing-library/react';

import { CtaButton } from '..';

describe('<CtaButton  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <CtaButton background={'black'} color={'white'} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

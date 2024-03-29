import * as React from 'react';
import { render } from '@testing-library/react';

import { Calculator } from '../index';

describe('<Calculator  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <Calculator
        showModal={() => {}}
        totem={'fox'}
        btcLastPrice={15000}
        tokenPrice={8}
      />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

import * as React from 'react';
import { render } from '@testing-library/react';

import { PredictModal } from '../index';
import { Totems } from '../../../../../../types/enums';

describe('<PredictModal  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <PredictModal
        close={() => {}}
        totem={'fox'}
        isOpen={true}
        isMobile={true}
        makeBet={() => {}}
      />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

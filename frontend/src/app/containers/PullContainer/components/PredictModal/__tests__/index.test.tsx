import * as React from 'react';
import { render } from '@testing-library/react';

import { PredictModal } from '../index';

describe('<PredictModal  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <PredictModal
        close={() => {}}
        totem={'fox'}
        isOpen={true}
        getGraphicsData={() => {}}
        graphicsData={[]}
        endTime={1}
        initBet={32000}
        makeBet={() => {}}
      />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

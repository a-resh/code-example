import * as React from 'react';
import { render } from '@testing-library/react';

import { ConfirmModal } from '../index';

describe('<ConfirmModal  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <ConfirmModal
        totem={'fox'}
        isOpen={false}
        close={() => {}}
        confirm={() => {}}
        loading={false}
        message={''}
      />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

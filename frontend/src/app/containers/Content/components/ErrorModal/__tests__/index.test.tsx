import * as React from 'react';
import { render } from '@testing-library/react';

import { ErrorModal } from '..';

describe('<ErrorModal  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ErrorModal close={() => {} } isOpen={true} totem={'fox'}/>);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

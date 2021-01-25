import * as React from 'react';
import {render} from '@testing-library/react';

import {PredictModal} from '..';
import {Totems} from "../../../../types/enums";

describe('<PredictModal  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<PredictModal close={() => {}} totem={Totems.FOX} isOpen={true} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

import * as React from 'react';
import {render} from '@testing-library/react';

import {Timer} from '..';

describe('<Timer  />', () => {
    it('should match snapshot', () => {
        const loadingIndicator = render(<Timer/>);
        expect(loadingIndicator.container.firstChild).toMatchSnapshot();
    });
});

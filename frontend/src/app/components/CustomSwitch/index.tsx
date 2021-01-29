/**
 *
 * CustomSwitch
 *
 */
import * as React from 'react';
import {
  Switch,
  SwitchClassKey,
  SwitchProps,
  withStyles,
} from '@material-ui/core';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const OrangeSwitch = withStyles({
  root: {
    width: 16,
    height: 8,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 0,
    color: '#FF6700',
    '&$checked': {
      transform: 'translateX(8px)',
      color: 'white',
      '& + $track': {
        opacity: 1,
        backgroundColor: '#FF6700',
        borderColor: '#FF6700',
      },
    },
  },
  thumb: {
    width: 8,
    height: 8,
    boxShadow: 'none',
  },
  track: {
    borderRadius: 8 / 2,
    opacity: 1,
    backgroundColor: 'white',
  },
  checked: {},
})(Switch);

export default function CustomSwitch() {
  const [state, setState] = React.useState({
    checked: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <OrangeSwitch
      checked={state.checked}
      onChange={handleChange}
      name="checked"
    />
  );
}

/**
 *
 * CustomSwitch
 *
 */
import * as React from 'react';
import { Switch, withStyles } from '@material-ui/core';
import { TotemsData } from '../../../types/constants';
import { useState } from 'react';

interface Props {
  totem: string;
  value: boolean;
  onChangeValue: (boolean) => void;
}

export default function CustomSwitch({ totem, value, onChangeValue }: Props) {
  const OrangeSwitch = withStyles({
    root: {
      width: 16,
      height: 8,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 0,
      color: TotemsData[totem].color,
      '&$checked': {
        transform: 'translateX(8px)',
        color: 'white',
        '& + $track': {
          opacity: 1,
          backgroundColor: TotemsData[totem].color,
          borderColor: TotemsData[totem].color,
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

  const [isChecked, setIsChecked] = useState(value);

  const handleChange = event => {
    setIsChecked(event.target.checked);
    onChangeValue(isChecked);
  };

  return (
    <OrangeSwitch checked={isChecked} onChange={handleChange} name="checked" />
  );
}

/**
 *
 * Slider
 *
 */
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core';
interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 50 + theme.spacing(1) * 2,
    },
    padding: {
      height: 0,
    },
  }),
);
const PrettoSlider = withStyles({
  root: {
    color: '#FF6700',
    height: 8,
  },
  thumb: {
    height: 8,
    width: 8,
    backgroundColor: '#fff',
    marginTop: 0,
    marginLeft: -8,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 1px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function CustomizedSlider() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={50}
      />
    </div>
  );
}

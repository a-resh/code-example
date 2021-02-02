/**
 *
 * Slider
 *
 */
import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import {createStyles, makeStyles, Theme, withStyles} from '@material-ui/core';
import {TotemsData} from "../../../types/constants";
import {useState} from "react";

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

interface Props {
    totem: string;
    value: number;
    onChangeValue: (number) => void;
}

export default function CustomizedSlider({totem, value, onChangeValue}: Props) {
    const classes = useStyles();
    const PrettoSlider = withStyles({
        root: {
            color: TotemsData[totem].color,
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
    const [sliderValue, setValue] = useState(value);
    const setNewValue = (e, newValue) => {
      setValue(newValue);
      onChangeValue(sliderValue);
    }
    return (
        <div className={classes.root}>
            <PrettoSlider
                onChange={setNewValue}
                valueLabelDisplay="auto"
                aria-label="slider"
                defaultValue={sliderValue}
            />
        </div>
    );
}

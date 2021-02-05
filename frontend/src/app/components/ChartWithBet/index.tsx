/**
 *
 * ChartWithBet
 *
 */
import * as React from 'react';
import {HorizontalGridLines, LineSeries, XAxis, XYPlot, YAxis} from 'react-vis';
import {curveCatmullRom} from 'd3-shape';
import {TotemsData} from "../../../types/constants";
import {BehaviorSubject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {Row} from "../blocks";
import styled from "styled-components/macro";
import {useState} from "react";

interface Props {
    totem: string;
    value: number;
    newValue: number;
    setPixelValue: (number) => void;
}

export function ChartWithBet({totem, value, newValue, setPixelValue}: Props) {
    // const [value, setValue] = useState();
    let b = 0;
    const v: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    const z = (e) => v.next(e)
    v.pipe(
        debounceTime(100)
    ).subscribe(b => console.log(b))
    let stepInPixels: number;
    const initValues = (value: number): number[] => {
        const maxValue = value * 1.5;
        const minValue = value * 0.5;
        const step = (maxValue - minValue) / 8;
        setPixelValue((maxValue - minValue) / 270);
        return Array.apply(null, new Array(8)).reduce((acc: any, v, index) => {
            if (!acc[index - 1]) {
                acc.push(minValue)
            } else {
                acc.push(+acc[index - 1] + step)
            }
            return acc;
        }, []) as number[];
    }
    const values = initValues(value);

    return (
        <Div>
            <XYPlot width={300 - 50} height={250}
                    margin={{left: 40, top: 5, bottom: 5, right: 0}}
            >
                <HorizontalGridLines
                    style={{stroke: 'black', opacity: '0.2'}}
                    tickValues={values}
                />
                <XAxis
                    style={{
                        line: {stroke: 'black'},
                        // text: { fontWeight: 300, fontSize: '8px'},
                        ticks: {},
                        text: {display: 'none', fontWeight: 300, fontSize: '8px'},
                    }}
                    tickSizeOuter={5}
                    tickSizeInner={null}
                    top={250 - 5}
                />
                <YAxis
                    style={{
                        line: {stroke: 'none'},
                        ticks: {stroke: 'none'},
                        text: {fontSize: '8px'}
                    }}
                    tickValues={values}
                    tickTotal={10}
                />
                <LineSeries
                    curve={curveCatmullRom.alpha(0.5)}
                    data={[{x: 0, y: values[3]}, {x: 2, y: values[2]}, {x: 3, y: values[5]}, {x: 8, y: value}]}
                    color={TotemsData[totem].color}
                    // onNearestXY={(e, index) => {console.log(e, index)}}
                    // onSeriesClick={(e) => v.next(e)}
                    onSeriesRightClick={(e) => console.log(e)}
                    //styles={{cursor: `pointer`}}
                />
                <LineSeries
                    data={[{x: 0, y: values[0]}, {x: 8, y: values[7]}]}
                    color={TotemsData[totem].color}
                    // onNearestXY={(e, index) => {console.log(e, index)}}
                    // onSeriesClick={(e) => v.next(e)}
                    onSeriesRightClick={(e) => console.log(e)}
                    style={{opacity: 0}}
                />
            </XYPlot>
            <XYPlot
                // className={'chart'}
                height={250}
                width={250 / 5}
                margin={{left: 0, top: 5, bottom: 5, right: 0}}
                onClick={(e) => console.log(e)}
                onMouseMove={(e) => {
                    b++;
                    const rect = e.target.getBoundingClientRect();
                    const x = e.clientX - rect.left; //x position within the element.
                    const y = e.clientY - rect.top;
                    z(Math.round(y))
                    // console.log( x, y, b)
                }}
            >
                <HorizontalGridLines
                    style={{stroke: 'black', opacity: '0.2'}}
                    tickValues={values}
                />
                <XAxis
                    style={{
                        line: {stroke: 'black'},
                        // text: { fontWeight: 300, fontSize: '8px'},
                        tick: {stroke: 'none'},
                        text: {display: 'none', fontWeight: 300, fontSize: '8px'},
                    }}
                    tickSizeOuter={null}
                    tickSizeInner={null}
                    top={250 - 5}
                />
                <LineSeries
                    data={[{x: 0, y: value}, {x: 1, y: newValue}]}
                    color={'grey'}
                    strokeStyle={'dashed'}
                    onSeriesRightClick={(e) => console.log(e)}
                    //styles={{cursor: `pointer`}}
                />
                <LineSeries
                    data={[{x: 0, y: values[0]}, {x: 1, y: values[7]}]}
                    color={TotemsData[totem].color}
                    style={{opacity: 0}}
                />
            </XYPlot>
        </Div>
    );

};

const Div = styled(Row)``


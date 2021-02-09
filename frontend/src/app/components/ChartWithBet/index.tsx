/**
 *
 * ChartWithBet
 *
 */
import * as React from 'react';
import {HorizontalGridLines, LineSeries, XAxis, XYPlot, YAxis} from 'react-vis';
import {curveCatmullRom} from 'd3-shape';
import {TotemsData} from "../../../types/constants";
import {Row} from "../blocks";
import styled from "styled-components/macro";
import {useState} from "react";
import {CustomPointer} from "../CustomPointer";

interface Props {
    totem: string;
    startValue: number;
    setBetValue: (number) => void;
}

export function ChartWithBet({totem, setBetValue, startValue}: Props) {
    const [lastDrag, setLastDrag] = useState(new Date());
    const maxValue = startValue * 1.5;
    const minValue = startValue * 0.5;
    const step = (maxValue - minValue) / 8;
    const pixelValue = (maxValue - minValue) / 270;
    const [startPosition, setStartPosition] = useState(443);
    const [value, setValue] = useState(startValue);
    const convertPointerMoveToBetValue = (newPosition: number) => {
        if( new Date().getTime() - lastDrag.getTime() > 200) {
            setLastDrag(new Date())
            console.log(Math.round(Math.abs(startValue + ((startPosition - newPosition) * pixelValue))), startPosition, newPosition, startPosition - newPosition)
            setValue(Math.round(Math.abs(startValue + ((startPosition - newPosition) * pixelValue))));
            setBetValue(value);
        }
    }
    const initValues = (): number[] => {
        return Array.apply(null, new Array(8)).reduce((acc: any, v, index) => {
            if (!acc[index - 1]) {
                acc.push(minValue)
            } else {
                acc.push(+acc[index - 1] + step)
            }
            return acc;
        }, []) as number[];
    }
    const values = initValues();

    return (
        <Div>
            <CustomPointer
                onDragPointer={convertPointerMoveToBetValue}
                startPosition={{x: 260, y: 92}}
                // position={position}
            />
            <XYPlot width={220} height={250}
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
                    data={[{x: 0, y: values[3]}, {x: 2, y: values[2]}, {x: 3, y: values[5]}, {x: 8, y: startValue}]}
                    color={TotemsData[totem].color}
                    // onNearestXY={(e, index) => {console.log(e, index)}}
                    // onSeriesClick={(e) => v.next(e)}
                    // onSeriesRightClick={(e) => console.log(e)}
                    //styles={{cursor: `pointer`}}
                />
                <LineSeries
                    data={[{x: 0, y: values[0]}, {x: 8, y: values[7]}]}
                    color={TotemsData[totem].color}
                    // onNearestXY={(e, index) => {console.log(e, index)}}
                    // onSeriesClick={(e) => v.next(e)}
                    // onSeriesRightClick={(e) => console.log(e)}
                    style={{opacity: 0}}
                />
            </XYPlot>
            <XYPlot
                // className={'chart'}
                height={250}
                width={40}
                margin={{left: 0, top: 5, bottom: 5, right: 0}}
                // onClick={(e) => console.log(e)}
                // onMouseMove={(e) => {
                //     const rect = e.target.getBoundingClientRect();
                //     const x = e.clientX - rect.left; //x position within the element.
                //     const y = e.clientY - rect.top;
                //     // console.log( x, y, b)
                // }}
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
                    data={[{x: 0, y: startValue}, {x: 1, y: value}]}
                    color={'grey'}
                    strokeStyle={'dashed'}
                    // onSeriesRightClick={(e) => console.log(e)}
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


/**
 *
 * ChartWithBet
 *
 */
import * as React from 'react';
import {
  HorizontalGridLines,
  LineSeries,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';
import { curveCatmullRom } from 'd3-shape';
import { TotemsData } from '../../../types/constants';
import { Row } from '../blocks';
import styled from 'styled-components/macro';

interface Props {
  totem: string;
  startValue: number;
  betValue: number;
}

export function ChartWithBet({ totem, startValue, betValue }: Props) {
  const maxValue = startValue * 1.5;
  const minValue = startValue * 0.5;
  const step = (maxValue - minValue) / 8;
  const validateBetValue = (v: number) => {
    if (v >= maxValue) {
      return maxValue - 4000;
    }
    if (v <= minValue) {
      return minValue;
    }
    return v;
  };
  const initValues = (): number[] => {
    return Array.apply(null, new Array(8)).reduce((acc: any, v, index) => {
      if (!acc[index - 1]) {
        acc.push(minValue);
      } else {
        acc.push(+acc[index - 1] + step);
      }
      return acc;
    }, []) as number[];
  };
  const values = initValues();

  return (
    <Div>
      <XYPlot
        width={250}
        height={240}
        margin={{ left: 40, top: 5, bottom: 5, right: 0 }}
      >
        <HorizontalGridLines
          style={{ stroke: 'black', opacity: '0.2' }}
          tickValues={values}
        />
        <XAxis
          style={{
            line: { stroke: 'black' },
            ticks: {},
            text: { display: 'none', fontWeight: 300, fontSize: '8px' },
          }}
          tickSizeOuter={5}
          tickSizeInner={null}
          top={250 - 5}
        />
        <YAxis
          style={{
            line: { stroke: 'none' },
            ticks: { stroke: 'none' },
            text: { fontSize: '8px' },
          }}
          tickValues={values}
          tickTotal={10}
        />
        <LineSeries
          curve={curveCatmullRom.alpha(0.5)}
          data={[
            { x: 0, y: values[3] },
            { x: 2, y: values[2] },
            { x: 3, y: values[5] },
            { x: 8, y: startValue },
          ]}
          color={TotemsData[totem].color}
        />
        <LineSeries
          data={[
            { x: 0, y: values[0] },
            { x: 8, y: values[7] },
          ]}
          color={TotemsData[totem].color}
          style={{ opacity: 0 }}
        />
      </XYPlot>
      <XYPlot
        height={240}
        width={40}
        margin={{ left: 0, top: 5, bottom: 5, right: 0 }}
      >
        <HorizontalGridLines
          style={{ stroke: 'black', opacity: '0.2' }}
          tickValues={values}
        />
        <XAxis
          style={{
            line: { stroke: 'black' },
            tick: { stroke: 'none' },
            text: { display: 'none', fontWeight: 300, fontSize: '8px' },
          }}
          tickSizeOuter={null}
          tickSizeInner={null}
          top={250 - 5}
        />
        <LineSeries
          curve={curveCatmullRom.alpha(0.5)}
          data={[
            { x: 0, y: startValue },
            { x: 1, y: validateBetValue(betValue) },
          ]}
          color={'grey'}
          strokeStyle={'dashed'}
        />
        <LineSeries
          data={[
            { x: 0, y: values[0] },
            { x: 1, y: values[7] },
          ]}
          color={TotemsData[totem].color}
          style={{ opacity: 0 }}
        />
      </XYPlot>
    </Div>
  );
}

const Div = styled(Row)``;

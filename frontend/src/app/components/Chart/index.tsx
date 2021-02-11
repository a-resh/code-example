/**
 *
 * Chart
 *
 */
import * as React from 'react';
import { LineSeries, XAxis, XYPlot } from 'react-vis';
import { curveCatmullRom } from 'd3-shape';

interface Props {}

export function Chart(props: Props) {
  return (
    <XYPlot width={180} height={120} color={'white'}>
      <XAxis
        style={{
          line: { stroke: 'none' },
          text: { fill: 'white', fontWeight: 300, fontSize: '8px' },
        }}
      />
      <LineSeries
        className="chart"
        curve={curveCatmullRom.alpha(0.5)}
        data={[
          { x: 1, y: 7 },
          { x: 2, y: 11 },
          { x: 3, y: 9 },
          { x: 4, y: 2 },
        ]}
        color={'white'}
      />
    </XYPlot>
  );
}

/**
*
* ChartWithBet
*
*/
import * as React from 'react';
import {LineSeries, XAxis, YAxis, XYPlot, HorizontalGridLines} from 'react-vis';
import {curveCatmullRom} from 'd3-shape';
import {TotemsData} from "../../../types/constants";
import {BehaviorSubject} from "rxjs";
import {debounceTime} from "rxjs/operators";

interface Props {
  totem: string;
}

export function ChartWithBet({totem}: Props) {
    let b = 0;
    const v: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    const z = (e) => v.next(e)
    v.pipe(
        debounceTime(100)
    ).subscribe(b => console.log(b))

    const initValues = (b = 32000): number[] => {
        const maxValue = b * 1.5;
        const minValue = b * 0.5;
        const step = (maxValue - minValue)/8;
        const values = Array.apply(null, new Array(8)).reduce((acc: any, v, index) => {
            if(!acc[index - 1]){
                acc.push(minValue)
            } else {
                acc.push(+acc[index - 1] + step )
            }
            return acc;
        }, []) as number[];
        return values
    }
    const values = initValues();

  return (
      <XYPlot width={300} height={250} className={'chart'}
              onClick={(e) => console.log(e)}
              onMouseMove={(e) => {
                  b++;
                  const rect = e.target.getBoundingClientRect();
                  const x = e.clientX - rect.left; //x position within the element.
                  const y = e.clientY - rect.top;
                  z(Math.round(y))
                  // console.log( x, y, b)
                  initValues();
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
              ticks: {},
              text: { display: 'none', fontWeight: 300, fontSize: '8px'},
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
            data={[{x: 0, y: values[0]}, {x: 2, y: values[2]}, {x: 3, y: values[5]}, {x: 8, y: values[3]}]}
            color={TotemsData[totem].color}
            // onNearestXY={(e, index) => {console.log(e, index)}}
            // onSeriesClick={(e) => v.next(e)}
            onSeriesRightClick={(e) => console.log(e)}
            //styles={{cursor: `pointer`}}
        />
          <LineSeries
              data={[{x: 0, y: values[0]}, {x: 10, y: values[7]}]}
              color={TotemsData[totem].color}
              // onNearestXY={(e, index) => {console.log(e, index)}}
              // onSeriesClick={(e) => v.next(e)}
              onSeriesRightClick={(e) => console.log(e)}
              style={{opacity: 0}}
          />
          {/*{arr.map((v, index) => {*/}
          {/*    b +=10;*/}
          {/*    return(*/}
          {/*        <LineSeries*/}
          {/*            ariaValueText={`b${b}`}*/}
          {/*            key={index}*/}
          {/*            // curve={curveCatmullRom.alpha(0.5)}*/}
          {/*            data={[{x: 0, y: b}, {x: 10, y: b}]}*/}
          {/*            color={`rgb(${b}, ${b}, ${b})`}*/}
          {/*            style={{opacity: 0}}*/}
          {/*            onNearestX={(e, index) => z({e, index: index.event.target})}*/}
          {/*        />*/}
          {/*    )*/}
          {/*})}*/}
      </XYPlot>
  );

};


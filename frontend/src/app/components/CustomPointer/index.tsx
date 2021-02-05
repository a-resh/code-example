/**
 *
 * CustomPointer
 *
 */
import * as React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components/macro';
import {useState} from "react";

interface Position {
    x: number;
    y: number;
}

interface Props {
    startPosition: Position;
    onDragPointer: (number) => void;
    setStartPosition: (number) => void;
    // position?: boolean;
}

export function CustomPointer({startPosition, onDragPointer, setStartPosition}: Props) {
    const [isAlreadyGetStartPosition, switchStartPosition] = useState(false);
    const [position, switchPosition] = useState(undefined as any);
    const setFirstPosition = (position: number) => {
        if(!isAlreadyGetStartPosition){
            switchStartPosition(true);
            setStartPosition(position);
        }
    }
    const validateDrag = (e: any) => {
        return  e instanceof MouseEvent
            ? e.clientY
            : e instanceof TouchEvent
                ? e.changedTouches[0].pageY
                : null;
    }
    return (
        <Draggable
            defaultPosition={{x: startPosition.x, y: startPosition.y}}
            disabled={position}
            cancel={'.chart-wrapper'}
            axis={"y"}
            onStart={(e: any) => {
                const touchValue = validateDrag(e);
                if (touchValue) {
                    setFirstPosition(touchValue)
                }
            }}
            onDrag={(e: any) => {
                const touchValue = validateDrag(e);
                if(touchValue && touchValue > 448 + 130){
                    switchPosition(true)
                }
                if (touchValue) {
                    onDragPointer(touchValue)
                }
            }}
        >
            <Div>
            </Div>
        </Draggable>
    );

};

const Div = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  cursor: pointer;
  background: no-repeat center url("/assets/images/chart-cursor.svg");
`;

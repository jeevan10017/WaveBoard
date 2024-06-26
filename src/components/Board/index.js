import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import rough from 'roughjs';
import boardContext from '../../store/board-context';
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from '../../constants';
import toolBoxContext from '../../store/toolbox-context';

function Board() {
    const canvasRef = useRef();
    const {
        elements,
        boardMouseDownHandler,
        boardMouseMoveHandler,
        boardMouseUPHandler,
        toolActiontype,
    } = useContext(boardContext);

const {toolboxState} = useContext(toolBoxContext);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log("Canvas initialized:", canvas.width, canvas.height);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.save();

        const roughCanvas = rough.canvas(canvas);

        elements.forEach((element) => {
            switch (element.type) {
                case TOOL_ITEMS.LINE:
                case TOOL_ITEMS.RECTANGLE:
                case TOOL_ITEMS.CIRCLE:
                case TOOL_ITEMS.ARROW:
                    roughCanvas.draw(element.roughEle);
                    break;
                    case TOOL_ITEMS.BRUSH:
                        context.fillStyle = element.stroke;
                       context.fill(element.path);
                       context.restore();
                       break;
                default:
                    throw new Error('TYPE NOT RECOGNISED ');
             }
            
        });

        return () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [elements]);

    const handleMouseDown = (event) => {
        boardMouseDownHandler(event, toolboxState);
    };

    const handleMouseMove = (event) => {
        if (toolActiontype === TOOL_ACTION_TYPES.DRAWING) {
            boardMouseMoveHandler(event);
        }
    };

    const handleMouseUP = () => {
        boardMouseUPHandler();
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUP}
        />
    );
}

export default Board;

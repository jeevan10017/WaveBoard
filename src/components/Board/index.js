import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import rough from 'roughjs';
import boardContext from '../../store/board-context';
import { TOOL_ACTION_TYPES } from '../../constants';

function Board() {
    const canvasRef = useRef();
    const {
        elements,
        boardMouseDownHandler,
        boardMouseMoveHandler,
        boardMouseUPHandler,
        toolActiontype,
    } = useContext(boardContext);

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
            roughCanvas.draw(element.roughEle);
        });

        return () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [elements]);

    const handleMouseDown = (event) => {
        boardMouseDownHandler(event);
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

import React, { useReducer } from 'react';
// import rough from 'roughjs/bin/rough';
import boardContext from './board-context';
import { TOOL_ITEMS, TOOL_ACTION_TYPES, BOARD_ACTIONS, } from '../constants';
import createRoughElement from '../utils/element';
import getStroke from 'perfect-freehand';
import { getSvgPathFromStroke } from '../utils/element';

const boardReducer = (state, action) => {
    switch (action.type) {
        case BOARD_ACTIONS.CHANGE_TOOL:
            console.log("Changing tool to:", action.payload);
            return {
                ...state,
                activeToolItem: action.payload,
            };
        case BOARD_ACTIONS.DRAW_DOWN: {
            const { clientX, clientY, stroke, fill, size } = action.payload;
            const newElement = createRoughElement(state.elements.length, clientX, clientY, clientX, clientY, {
                type: state.activeToolItem,
                stroke,
                fill,
                size
            });
            console.log("Draw down at:", clientX, clientY);
            return {
                ...state,
                toolActiontype: TOOL_ACTION_TYPES.DRAWING,
                elements: [...state.elements, newElement],
            };
        }
        case BOARD_ACTIONS.DRAW_MOVE: {
            const { clientX, clientY } = action.payload;
            const newElements = [...state.elements];
            const index = newElements.length - 1;
            const { type } = newElements[index];
            switch(type){
                case TOOL_ITEMS.LINE:
                case TOOL_ITEMS.RECTANGLE:
                case TOOL_ITEMS.CIRCLE:
                case TOOL_ITEMS.ARROW:
                    const { x1, y1, stroke, fill, size ,type } = newElements[index];
            const newElement = createRoughElement(index, x1, y1, clientX, clientY, { type: state.activeToolItem, stroke, fill, size })
            newElements[index] = newElement;
            return {
                ...state,
                elements: newElements,
            };
                case TOOL_ITEMS.BRUSH:
                    newElements[index].points = [...newElements[index].points,{ x: clientX, y: clientY }];
                    newElements[index].path = new Path2D(
                        getSvgPathFromStroke(getStroke(newElements[index].points)));
                        return {
                            ...state,
                            elements: newElements,
                        };
                default:
                   throw new Error("TYPE NOT RECOGNISED");
            }

        }
        case BOARD_ACTIONS.DRAW_UP:
            console.log("Draw up");
            return {
                ...state,
                toolActiontype: TOOL_ACTION_TYPES.NONE,
            };
        default:
            return state;
    }
};

const initialBoardState = {
    activeToolItem: TOOL_ITEMS.LINE,
    toolActiontype: TOOL_ACTION_TYPES.NONE,
    elements: [],
};

const BoardProvider = ({ children }) => {
    const [boardState, dispatchBoardAction] = useReducer(boardReducer, initialBoardState);

    // const {toolBoxState} = useContext(toolBoxContext);

    const changeToolHandler = (tool) => {
        dispatchBoardAction({
            type: BOARD_ACTIONS.CHANGE_TOOL,
            payload: tool,
        });
    };

    const boardMouseDownHandler = (event, toolboxState) => {
        const { clientX, clientY } = event;
        dispatchBoardAction({
            type: BOARD_ACTIONS.DRAW_DOWN,
            payload: {
                clientX,
                clientY,
                stroke: toolboxState[boardState.activeToolItem]?.stroke,
                fill: toolboxState[boardState.activeToolItem]?.fill,
                size: toolboxState[boardState.activeToolItem]?.size,
            },
        });
    };

    const boardMouseMoveHandler = (event) => {
        const { clientX, clientY } = event;
        dispatchBoardAction({
            type: BOARD_ACTIONS.DRAW_MOVE,
            payload: { clientX, clientY },
        });
    };

    const boardMouseUPHandler = () => {
        dispatchBoardAction({
            type: BOARD_ACTIONS.DRAW_UP,
        });
    };

    return (
        <boardContext.Provider value={{
            activeToolItem: boardState.activeToolItem,
            elements: boardState.elements,
            toolActiontype: boardState.toolActiontype,
            changeToolHandler,
            boardMouseDownHandler,
            boardMouseMoveHandler,
            boardMouseUPHandler,
        }}>
            {children}
        </boardContext.Provider>
    );
};

export default BoardProvider;

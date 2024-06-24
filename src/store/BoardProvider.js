import React, { useReducer } from 'react';
import rough from 'roughjs/bin/rough';
import boardContext from './board-context';
import { TOOL_ITEMS, TOOL_ACTION_TYPES, BOARD_ACTIONS } from '../constants';
import  createRoughElement  from '../utils/element';

const boardReducer = (state, action) => {
    switch (action.type) {
        case BOARD_ACTIONS.CHANGE_TOOL:
            console.log("Changing tool to:", action.payload);
            return {
                ...state,
                activeToolItem: action.payload,
            };
        case BOARD_ACTIONS.DRAW_DOWN: {
            const { clientX, clientY } = action.payload;
            const newElement = createRoughElement(state.elements.length, clientX, clientY, clientX, clientY, {type: state.activeToolItem});
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
            const {x1 , y1} = newElements[index];
            const newElement = createRoughElement(index , x1 , y1 ,clientX , clientY , {type: state.activeToolItem})
            newElements[index] = newElement;

            console.log("Draw move to:", clientX, clientY);
            return {
                ...state,
                elements: newElements,
            };
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

    const changeToolHandler = (tool) => {
        dispatchBoardAction({
            type: BOARD_ACTIONS.CHANGE_TOOL,
            payload: tool,
        });
    };

    const boardMouseDownHandler = (event) => {
        const { clientX, clientY } = event;
        dispatchBoardAction({
            type: BOARD_ACTIONS.DRAW_DOWN,
            payload: { clientX, clientY },
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

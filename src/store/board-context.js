import { createContext } from 'react';

const boardContext = createContext({
    activeToolItem: '',
    toolActiontype: '',
    elements: [],
    boardMouseDownHandler: () => {},
    changeToolHandler: () => {},
    boardMouseMoveHandler: () => {},
    boardMouseUPHandler: () => {},
});

export default boardContext;

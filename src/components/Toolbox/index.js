import React,{useContext} from 'react'
import classes from './index.module.css'
import cx from 'classnames'
import { COLORS, STROKE_TOOL_TYPES ,FILL_TOOL_TYPES, SIZE_TOOL_TYPES } from '../../constants'
import  boardContext from '../../store/board-context'
import toolboxContext from '../../store/toolbox-context'

const Toolbox = () => {
    const {activeToolItem} = useContext(boardContext);
    const {toolboxState, changeStroke ,changeFill ,changeSize} = useContext(toolboxContext);

    const strokeColor = toolboxState[activeToolItem]?.stroke;
    const fillColor = toolboxState[activeToolItem]?.fill;
    const size = toolboxState[activeToolItem]?.size;

    return (
        <div className={classes.container}>
            {STROKE_TOOL_TYPES.includes(activeToolItem) && <div className={classes.selectOptionContainer}>
               <div className={classes.toolBoxLabel}>Stroke Color</div>
                <div className= {classes.colorsContainer}>
                   {Object.keys(COLORS).map((k) => {
                       return (
                        
                           <div
                           key={k}
                           className={cx(classes.colorBox , {
                            [classes.activeColorBox]: strokeColor === COLORS[k]
                        })} 
                        style={{backgroundColor : COLORS[k]}}
                        onClick={() => changeStroke(activeToolItem , COLORS[k])}
                        ></div>
                       )
                   })}
                </div>
            </div>}
         { FILL_TOOL_TYPES.includes(activeToolItem) &&<div className={classes.selectOptionContainer}>
                <div className={classes.toolBoxLabel}>Fill Color</div>
                <div className= {classes.colorsContainer}>
                   {Object.keys(COLORS).map((k) => {
                       return (
                           <div 
                           key={k}
                           className={cx(classes.colorBox , {
                            [classes.activeColorBox]: fillColor === COLORS[k]
                        })} 
                        style={{backgroundColor : COLORS[k]}}
                        onClick={() => changeFill(activeToolItem , COLORS[k])}
                        ></div>
                       )
                   })}
                </div>
            </div>}
         { SIZE_TOOL_TYPES.includes(activeToolItem) &&<div className={classes.selectOptionContainer}>
                <div className={classes.toolBoxLabel}>Brush Size</div>
                <input 
                type="range" 
                step={1}
                min={1}
                max={10}
                value={size}
                onChange={(event) => changeSize(activeToolItem ,event.target.value)}
                ></input>

            </div>}
        </div>
    )
}

export default Toolbox 
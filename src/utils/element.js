import { TOOL_ITEMS } from "../constants";
import rough from "roughjs/bin/rough";
import { ARROW_LENGTH } from '../constants';
import {getArrowHeadCoordinates}  from "./math";
const gen = rough.generator();


export const creatRoughElement = (id, x1, y1, x2, y2, { type }) => {

    const element = {
        id,
        x1,
        y1,
        x2,
        y2,

    };
    let options = {
        seed: id+1 , //id can"t be zero 
    }
    switch (type) {
        case TOOL_ITEMS.LINE:
            element.roughEle = gen.line(x1, y1, x2, y2 ,options);
            return element;
        case TOOL_ITEMS.RECTANGLE:
            element.roughEle = gen.rectangle(x1, y1, x2 - x1, y2 - y1 , options);
            return element;
        case TOOL_ITEMS.CIRCLE:
            // const width = Math.abs(x2 - x1);
            // const height = Math.abs(y2 - y1);
            // const diameter = Math.min(width, height);              
            // element.roughEle = gen.circle(x1, y1, diameter , options);     This is gives the absolute circle

          const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2;
            const width = x2 - x1;
            const height = y2 - y1;
            element.roughEle = gen.ellipse(cx, cy, Math.abs(width), Math.abs(height), options);

            return element;
        case TOOL_ITEMS.ARROW:
            const {x3, y3, x4, y4} = getArrowHeadCoordinates(x1, y1, x2, y2, ARROW_LENGTH);
            const points = [[x1, y1], [x2, y2], [x3, y3], [x2, y2], [x4, y4]];  //x2,y2 is the tip of the arrow head    //x1,y1 is the start of the arrow head //x3,y3 and x4,y4 are the two points of the arrow head
             element.roughEle = gen.linearPath(points , options);
             return element;

        default:
            throw new Error("Invalid type tool type not recognised");
        
    }


}

export default creatRoughElement;
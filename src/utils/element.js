import { TOOL_ITEMS ,ARROW_LENGTH} from "../constants";
import rough from "roughjs/bin/rough";
import {getArrowHeadCoordinates , isPointCloseToLine}  from "./math";
import getStroke from "perfect-freehand";
const gen = rough.generator();


export const creatRoughElement = (id, x1, y1, x2, y2, { type ,stroke , fill ,size }) => {
    const element = {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        stroke,
        fill,
        size
    };
    let options = {
        seed: id+1 , //id can"t be zero 
        fillStyle:"solid",
    }
    if (stroke) {
        options.stroke = stroke;
    }
    if (fill) {
        options.fill = fill;
    }
    if(size){
        options.strokeWidth = size;
    }

    
    switch (type) {
        case TOOL_ITEMS.BRUSH:{
            const brushElement ={
             id,
             points : [{x : x1 , y : y1}],
             path : new Path2D(getSvgPathFromStroke(getStroke([{x : x1 , y : y1}]))),
             type,
            stroke,
            }
            return brushElement;
        }

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
      
};
export const isPointNearElement = (element, pointX, pointY) => {
  const { x1, y1, x2, y2, type } = element;
  switch (type) {
      case TOOL_ITEMS.LINE:
      case TOOL_ITEMS.ARROW:
          return isPointCloseToLine(x1, y1, x2, y2, pointX, pointY);
      case TOOL_ITEMS.RECTANGLE:
      case TOOL_ITEMS.CIRCLE:
          return (
              isPointCloseToLine(x1, y1, x2, y1, pointX, pointY) ||
              isPointCloseToLine(x2, y1, x2, y2, pointX, pointY) ||
              isPointCloseToLine(x2, y2, x1, y2, pointX, pointY) ||
              isPointCloseToLine(x1, y2, x1, y1, pointX, pointY)
          );
      case TOOL_ITEMS.BRUSH: {
          const canvas = document.getElementById("canvas");
          if (!canvas) {
              console.error("Canvas element not found");
              return false;
          }
          const context = canvas.getContext("2d");
          if (!context) {
              console.error("Unable to get canvas context");
              return false;
          }
          return context.isPointInPath(element.path, pointX, pointY);
      }
      default:
          throw new Error("TYPE NOT RECOGNISED");
  }
};

export default creatRoughElement;
export const  getSvgPathFromStroke = (stroke) =>{
  if (!stroke.length) return ""

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ["M", ...stroke[0], "Q"]
  )

  d.push("Z")
  return d.join(" ")
}
  
  

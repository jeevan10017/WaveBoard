import { useEffect,useRef } from 'react';
import rough from 'roughjs';



function Board() { 
  const canvasRef = useRef();     //canvas ko dekhna hai
  useEffect(() => {                                          //canvas me kuch/draw karna hai
     const canvas   = canvasRef.current;               
     canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');

    const roughCanvas = rough.canvas(canvas);
    const generator = roughCanvas.generator;
    let rect1 = generator.rectangle(10, 10, 100, 100);
    let rect2 = generator.rectangle(10, 120, 100, 100, {fill: 'red' , fillStyle: 'solid' , strokeWidth: 4});
    roughCanvas.draw(rect1);
    roughCanvas.draw(rect2);

    // context.fillStyle = 'red';
    // context.fillRect(10, 10, 100, 100);
  }, []);

  return (
    <div className="Board">
      <h1>Waveboard</h1>
      <canvas ref={canvasRef} 
      />
    </div>
  );
}

export default Board;

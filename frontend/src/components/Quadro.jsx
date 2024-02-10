import { useEffect } from "react";

export default function Quadro ({trash, setTrashContent}){

    var isDrawing = false;
    localStorage.setItem('formulario', 'img');

    let lastX = 0;
    let lastY = 0;

    function calce() {
      return visualViewport.width>500? 500: visualViewport.width * 0.9;
     }
     
     useEffect(()=> {
      limpar();
      setTrashContent(false);    
    }, [trash])

    function salvar() {
      const canvas = document.querySelector('#draw');
      if (!canvas) return; // Verifica se o canvas foi encontrado
      
      var imageCanvas = canvas.toDataURL();
      localStorage.setItem('img', imageCanvas);

    }

    function limpar() {
      const canvas = document.querySelector('#draw');
      if (!canvas) return; // Verifica se o canvas foi encontrado
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    useEffect(()=> {
      const canvas = document.querySelector('#draw');
      if(!canvas) return;
      const ctx = canvas.getContext('2d');
   

        canvas.width = calce();
        canvas.height = calce();

        ctx.strokeStyle = '#000';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = '10'

        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mousedown", (e) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
          });
        canvas.addEventListener("mouseup", (e) => {
          isDrawing = false;
          salvar();
          });
        canvas.addEventListener("mouseout", () => {
          isDrawing = false;
          });
          
          canvas.addEventListener("pointermove", drawTouch);
          canvas.addEventListener("pointerdown", (e) => {      
              isDrawing = true;
              [lastX, lastY] = [e.offsetX, e.offsetY];
            });
          canvas.addEventListener("pointerup", (e) => {
            isDrawing = false;
            salvar();
            });
          canvas.addEventListener("pointerleave", () => {
            isDrawing = false;
            });
            

            
        function draw(e) {
            if(isDrawing == false) return;

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            lastX = e.offsetX;
            lastY = e.offsetY;
            ctx.stroke();
          }

          function drawTouch(e) {
            if(isDrawing == false) return;

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            lastX = e.offsetX;
            lastY = e.offsetY;
            ctx.stroke();
          }


    }, [])

    return (
    <div className="w-[90vw] z-50 h-[90vw] sm:h-[500px] max-w-[500px] ">
        <canvas
        className=" absolute z-10 bg-[#8CCBAD]"
        id="draw"
      >
      </canvas>
    </div>
    );
}

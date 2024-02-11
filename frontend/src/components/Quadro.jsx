import { useEffect, useState } from "react";

export default function Quadro ({trash, setTrashContent}){

    var isDrawing = false;
    localStorage.setItem('formulario', 'img');

    let lastX = 0;
    let lastY = 0;

    function calce () {
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

    const [author, setAuthor] = useState('Autor')
 
    function handleChange(e) {
      localStorage.setItem(e.target.id, e.target.value);

      setAuthor(localStorage.getItem('Author'));
      setMessageHolder(localStorage.getItem('Message'));
  }


    return (
    <div className="w-[90vw] z-50 h-[100%] sm:h-[550px] flex-col  max-w-[500px] bg-[#8CCBAD] ">
        <canvas
        className="  z-10 bg-[#4e5c55]"
        id="draw"
      >
      </canvas>
      <div className='w-[100%] absolute h-[40px] top-[80vw] z-50  sm:top-[460px] flex justify-end pr-4 pointer-events-none'>
        <h6 className=" text-[25px] underline text-[#130c16] pr-2 text-right font-medium ">{author}</h6>
      </div>
      <div className="w-[100%] h-[50px] flex relative justify-center opacity-50"> 
            <input onChange={handleChange} id="Author" type="text" maxLength={14} placeholder={author} className="w-full rounded-none ps-1 md:ps-8 h-[50px] text-[32px] md:text-[42px] placeholder-[#704747] text-[#a55656] focus:outline-none focus:bg-white border-[#6bc5b5] border-4 focus:border-[#4e9084] bg-[#8CCBAD]"  />
      </div>
      </div>
    );
}

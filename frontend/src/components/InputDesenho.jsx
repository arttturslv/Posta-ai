import { useEffect, useState, useRef } from "react";

export default function InputDesenho({ trash, setTrashContent }) {
  const [author, setAuthor] = useState("Autor");
  const historyRef = useRef([]);
  const isDrawingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);

  localStorage.setItem("formulario", "img");

  useEffect(() => {
    limpar();
    setTrashContent(false);
  }, [trash]);

  function handleChange(e) {
    localStorage.setItem(e.target.id, e.target.value);
    setAuthor(localStorage.getItem("Author") || "Autor");
  }

  function calcCanvasSize() {
    return visualViewport.width > 500 ? 500 : visualViewport.width * 0.9;
  }

  function comparaCanvas(ctxCanvasDrawing) {
    var blankCanvas = document.createElement("canvas");
    blankCanvas.height = calcCanvasSize();
    blankCanvas.width = calcCanvasSize();

    var blankCtx = blankCanvas.getContext("2d");

    var blankImgData = blankCtx.getImageData(
      0,
      0,
      calcCanvasSize(),
      calcCanvasSize()
    );
    var imgData = ctxCanvasDrawing.getImageData(
      0,
      0,
      calcCanvasSize(),
      calcCanvasSize()
    );

    for (var i = 0; i < blankImgData.data.length; i++) {
      if (blankImgData.data[i] !== imgData.data[i]) {
        return false;
      }
    }
    return true;
  }

  function salvarSnapshot() {
    const canvas = document.querySelector("#draw");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    historyRef.current.push(imageData);
  }

  function undo() {
    const canvas = document.querySelector("#draw");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (historyRef.current.length > 1) {
      historyRef.current.pop();
      const prevState = historyRef.current[historyRef.current.length - 1];
      ctx.putImageData(prevState, 0, 0);
      salvar();
    } else if (historyRef.current.length === 1) {
      historyRef.current.pop();
      limpar();
    }
  }

  function salvar() {
    const canvas = document.querySelector("#draw");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (comparaCanvas(ctx)) {
      console.log("Canvas vazio. Não foi salvo");
      localStorage.removeItem("img");
      return;
    }

    var imageCanvas = canvas.toDataURL();
    localStorage.setItem("img", imageCanvas);
  }

  function limpar() {
    const canvas = document.querySelector("#draw");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    historyRef.current = [];
    localStorage.removeItem("img");
  }

  useEffect(() => {
    const canvas = document.querySelector("#draw");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = calcCanvasSize();
    canvas.height = calcCanvasSize();

    ctx.strokeStyle = "#000";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = "10";
    ctx.will

    if (historyRef.current.length === 0) {
      const initialBlank = ctx.getImageData(0, 0, canvas.width, canvas.height);
      historyRef.current = [initialBlank];
    }

    function draw(e) {
      if (!isDrawingRef.current) return;

      ctx.beginPath();
      ctx.moveTo(lastXRef.current, lastYRef.current);
      ctx.lineTo(e.offsetX, e.offsetY);
      lastXRef.current = e.offsetX;
      lastYRef.current = e.offsetY;
      ctx.stroke();
    }

    function handlePointerDown(e) {
      isDrawingRef.current = true;
      lastXRef.current = e.offsetX;
      lastYRef.current = e.offsetY;
    }

    function handlePointerUp() {
      if (isDrawingRef.current) {
        isDrawingRef.current = false;
        salvarSnapshot();
        salvar();
      }
    }

    function handlePointerLeave() {
      if (isDrawingRef.current) {
        isDrawingRef.current = false;
        salvarSnapshot();
        salvar();
      }
    }

    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
      }
    }

    canvas.addEventListener("pointermove", draw);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      canvas.removeEventListener("pointermove", draw);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-[90vw] z-50 h-[100%] sm:h-[550px] flex-col max-w-[500px] bg-[#8CCBAD] relative">
      <button
        type="button"
        onClick={undo}
        title="Desfazer (Ctrl+Z)"
        className="absolute top-2 left-2 z-50 bg-[#6bc5b5] hover:bg-[#4e9084] text-white p-2 rounded-full shadow-md transition-all flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
          />
        </svg>
      </button>

      <canvas className="z-10 bg-[#8CCBAD]" id="draw"></canvas>
      <div className="w-[100%] absolute h-[40px] top-[80vw] z-50 sm:top-[460px] flex justify-end pr-4 pointer-events-none">
        <h6 className="text-[25px] underline text-[#130c16] pr-2 text-right font-medium">
          {author}
        </h6>
      </div>
      <div className="w-[100%] h-[50px] flex relative justify-center opacity-50">
        <input
          onChange={handleChange}
          id="Author"
          type="text"
          maxLength={20}
          placeholder={author}
          className="w-full rounded-none ps-1 md:ps-8 h-[50px] text-[32px] md:text-[42px] placeholder-[#704747] text-[#a55656] focus:outline-none focus:bg-white border-[#6bc5b5] border-4 focus:border-[#4e9084] bg-[#8CCBAD]"
        />
      </div>
    </div>
  );
}

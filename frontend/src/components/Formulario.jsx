/** @format */

import Lixeira from "./Lixeira";
import { useState, useEffect } from "react";

export default function Formulario({ setCards, Quadro, setQuadro }) {
  const API = import.meta.env.VITE_API;

  const [trash, setTrashContent] = useState(false);

  useEffect(() => {
    limpar();
    setTrashContent(false);
  }, [trash]);

  function onSend() {
    if (localStorage.getItem("formulario") == "img") {
      const author = localStorage.getItem("Author");
      const message = null;
      const image = localStorage.getItem("img");
      postar(author, message, image);
    } else {
      const author = localStorage.getItem("Author");
      const message = localStorage.getItem("Message");
      const image = null;
      postar(author, message, image);
    }
  }

  function limpar() {
    localStorage.removeItem("Author");
    localStorage.removeItem("Message");
    localStorage.removeItem("img");
  }

  function onExit() {
    setQuadro(false);
    document.body.style.overflow = "auto";
    document.body.style.touchAction = "auto";
  }

  async function postar(author, message, image) {
    onExit();

    if (!message && !image) return;

    fetch(`${API}/post/`, {
      method: "POST",
      body: JSON.stringify({
        note: message,
        author: author,
        image: image,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setCards((prevCards) => [
          {
            _id: json._id,
            note: json.note,
            author: json.author,
            image: json.image,
          },
          ...(prevCards || []),
        ]);
      });
  }

  return (
    <div
      id="form"
      className="w-full z-50 flex h-full backdrop-blur-sm absolute justify-center top-[270px] "
    >
      <div
        className={
          "w-[90vw]  max-w-[500px] gap-4 flex flex-col shadow-2xl absolute "
        }
      >
        <Quadro trash={trash} setTrashContent={setTrashContent} />

        <div className=" inline-flex gap-1">
          <div className="bg-[#DAC285] w-[50%] text-center cursor-pointer shadow-4xl active:shadow-5xl active:shadow-6xl">
            <h5 onClick={onSend} className="text-[52px] text-[#2B5443]">
              Postar
            </h5>
          </div>
          <div className="bg-[#DAC285] w-[50%] text-center cursor-pointer shadow-4xl active:shadow-5xl active:shadow-6xl">
            <h5 onClick={onExit} className="text-[52px] text-[#D04646]">
              Cancelar
            </h5>
          </div>
          <Lixeira setTrashContent={setTrashContent}></Lixeira>
        </div>
      </div>
    </div>
  );
}

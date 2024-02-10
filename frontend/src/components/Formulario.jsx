import Lixeira from "./Lixeira" 
import { useState } from "react";

export default function Formulario({setCards, Quadro, setQuadro}) {
    const [trash, setTrashContent] = useState(false);

    function onSend() {
      if(localStorage.getItem('formulario') == 'img') {
        const author = null;
        const message = null;
        const image = localStorage.getItem('img');
        postar(author, message, image);
      } else {
        const author = localStorage.getItem('Author');
        const message = localStorage.getItem('Message');
        const image = null;
        postar(author, message, image);
      }
  }


    function onExit() {
      setQuadro(false);
      document.body.style.overflow = 'auto'
    }

    async function postar(author, message, image) {
      onExit();

      fetch('http://localhost:3001/post', {
        method: "POST",
        body: JSON.stringify({
          note: message,
          author: author,
          image: image
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
     } 
      }).then((response) => response.json())
      .then((json) => { 
        setCards((prevCards) => [
          ...prevCards, {
            note: json.note, author:json.author, image:json.image
          }
        ])
      });
      }

    return (
      <div  id='form' className="w-full z-50 flex h-full backdrop-blur-sm absolute justify-center top-[270px] ">
          <div className={'w-[90vw]  max-w-[500px] gap-3 flex flex-col shadow-2xl absolute '}>
          <Quadro trash={trash} setTrashContent={setTrashContent}/>
              <div className=" inline-flex gap-1">
                  <div className="bg-[#DAC285] w-[50%] text-center cursor-pointer shadow-4xl active:shadow-5xl active:shadow-6xl">
                      <h5 onClick={onSend} className="text-[52px] text-[#2B5443]">Postar</h5>
                  </div>
                  <div className="bg-[#DAC285] w-[50%] text-center cursor-pointer shadow-4xl active:shadow-5xl active:shadow-6xl">
                      <h5 onClick={onExit} className="text-[52px] text-[#D04646]">Cancelar</h5>
                  </div>
                  <Lixeira setTrashContent={setTrashContent}></Lixeira>
              </div>
          </div>
      </div>
      )
}

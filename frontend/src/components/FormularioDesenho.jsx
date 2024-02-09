import Mesa from "./Quadro" 
import Lixeira from "./Lixeira" 
import { useState } from "react";

export default function Quadro({setCards}) {
    
  const [trash, setTrashContent] = useState(false);

    function onExit() {
        document.getElementById('desenho').style.display = 'none';
      }
    
    function onSend() {
        let img = localStorage.getItem('img');
        postar(img);
    }


    async function postar(img) {
        fetch('http://localhost:3001/post', {
          method: "POST",
          body: JSON.stringify({
            note: null,
            author: null,
            image: img
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
    <div  id='desenho' className="w-screen h-screen backdrop-blur-sm absolute justify-center top-[270px] hidden">
        <div className={'w-[90vw] max-w-[500px] gap-3 flex flex-col shadow-2xl absolute '}>
            <Mesa trash={trash} setTrashContent={setTrashContent}/>
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

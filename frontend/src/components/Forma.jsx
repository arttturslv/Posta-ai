import Input from "./input" 
import { useEffect, useState } from "react";

export default function Forma() {

    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');

    function onSend() {
        setAuthor(localStorage.getItem('Author'));
        setMessage(localStorage.getItem('Message'));

        if(message!='' && message.length<120) {
            postar();
        } else {
            console.error("Message is null or has more than 120 caracters.")
        }
    }

    function onExit() {
        document.getElementById('blur').style.display = 'none';
        console.log("fechando")
    }

    async function postar() {
   
        console.log(author);
        console.log(message);

        fetch('https://poste-ai.vercel.app/post', {
          method: "POST",
          body: JSON.stringify({
            note: message,
            author: author
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          } 
        }).then((response) => response.json())
        .then((json) => { 
          
          setCards((prevCards) => [
            ...prevCards, {
              note: json.note, author:json.author
            }
          ])
  
        });
        }
  



    return (
    <div id='blur' className="w-screen hidden h-screen backdrop-blur-sm absolute justify-center ">
        <div className={'w-[90vw] max-w-[500px] gap-3 flex flex-col shadow-2xl absolute top-[350px] '}>
            <Input />
            <div className="inline-flex gap-3">
                <div className="bg-[#DAC285] w-[50%] text-center cursor-pointer shadow-4xl active:shadow-5xl active:shadow-6xl">
                    <h5 onClick={onSend} className="text-[52px] text-[#2B5443]">Postar</h5>
                </div>
                <div className="bg-[#DAC285] w-[50%] text-center cursor-pointer shadow-4xl active:shadow-5xl active:shadow-6xl">
                    <h5 onClick={onExit} className="text-[52px] text-[#D04646]">Cancelar</h5>
                </div>
            </div>
        </div>
    </div>
    )
}

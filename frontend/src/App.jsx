import './index.css'
import Card from './components/Card';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {
  
  const colors = {
    lightblue: '#9bbec7',
    salmonpink: '#FFA5AB',
    mindaro: '#c8e087',
    jasmine: '#EECF6D',
    lightgreen: '#aceb98',
    tomato: '#f15946',
  };
  
  function changeColor() {
    const colorNames = Object.keys(colors);
    const randomIndex = Math.floor(Math.random() * colorNames.length);
    const randomColorName = colorNames[randomIndex];
    const randomColor = colors[randomColorName];
    return randomColor;
  };

  const author = document.getElementById('Author');
  const message = document.getElementById('Message');
  

  function onSend(e) {

    e.preventDefault();
    const note = message.value;
    
    if(note==null || note.length<1 || note.length>120) {
      message.classList.add('pulse');
    } else {
      postar(note, author.value);
    }
  }

    function handleChange() {
      author.classList.remove('pulse');
      message.classList.remove('pulse');
    }

    const [postRenderizados, setPostRenderizados] = useState(0);

    async function receber() {
      fetch(`https://poste-ai.vercel.app/${postRenderizados}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        } 
      }).then((response) => response.json())
      .then((json) => { 

        setCards(json.data)
        setPostRenderizados(postRenderizados+json.skipValue);

      });
    }

    useEffect(()=> {
      receber();
    },[])


    async function postar(message, author) {
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

  const [cards, setCards] = useState(null);

  return (
    <div className="h-screen w-full ">
          <div className="flex flex-col gap-3 items-center ">

        <div className='flex items-center h-[300px] justify-around flex-col px-3'>
          <h1 className="sm:text-[5vw] text-[2rem] xl:text-[6rem] text-center text-[#ffff] font-bold pt-10 my-5">
            Posta aí!
          </h1>
          <div>

            <form className='block gap-5 items-end  sm:flex'>
              <div>
                <label htmlFor="mensagem" className="text-sm font-medium ">Mensagem</label>
                <input onChange={handleChange} id="Message" type="text" maxLength={120} className=" shadow-inner disabled:bg-slate-50 invalid:border-pink-500 w-full p-4 ps-10 text-sm placeholder-[#6f6363] text-seal-brown font-medium border  rounded-lg bg-jasmine" placeholder="Eae galera, como vocês estão?" required></input>
              </div>

              <div>
                <label htmlFor="mensagem" className="text-sm font-medium ">Autor</label>
                <input onChange={handleChange} id="Author" type="text" maxLength={14} className="w-full shadow-inner p-4 ps-10 text-sm placeholder-[#6f6363] text-seal-brown font-medium border rounded-lg bg-jasmine" placeholder="Artur" ></input>
              </div>

              <button type="submit" onClick={(e) => onSend(e)} className='mt-6 h-[55px] sm:w-auto w-[100%] self-center px-4 rounded-lg text-sm text-seal-brown border-2 font-medium border-[#ffff] bg-jasmine hover:bg-[#553029] hover:text-[#fff]'>Colar</button>
            </form>

          </div>
        </div>
        <div id='Panel' className='flex h-[500px] gap-6 flex-wrap max-w-[1300px] pt-[5rem] justify-center'>
            {cards==null ?  
            <span>
              <span className=' animate-bounce h-10 flex flex-col items-center gap-2'>  
                <span className='animate-spin w-5 h-5 bg-jasmine'></span>
              </span>
              <h5 className=' font-semibold '>Carregando...</h5>
            </span>
            :
            cards.map((card, index) => (
              <Card
                key={index}
                note={card.note}
                author={card.author}
                color={changeColor()}
                />
            )) 
            }
        </div>
    </div>
    </div>

  )
}

export default App

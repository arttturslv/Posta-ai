import './index.css'
import Card from './components/CardPost';
import Forma from './components/Formulario';
import Quadro from './components/FormularioDesenho';
import imgChoiceDesenho from './assets/desenhar.svg';
import imgChoiceEscrita from './assets/escrever.svg';

import { useState, useEffect } from 'react';



function App() {

  const colors = {
    lightblue: '#9bbec7',
    salmonpink: '#FFA5AB',
    mindaro: '#c8e087',
    jasmine: '#EECF6D',
    lightgreen: '#aceb98',
    tomato: '#f15946',
    a1: '#62804D',
    a2: '#D04646',
    a3: '#E46746',
    a4: '#61788A',
    a5: '#D4874D',
  };
  
  function changeColor() {
    const colorNames = Object.keys(colors);
    const randomIndex = Math.floor(Math.random() * colorNames.length);
    const randomColorName = colorNames[randomIndex];
    const randomColor = colors[randomColorName];
    return randomColor;
  };

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

    function onExit() {
      document.getElementById('form').style.display = 'flex';
    }
    function onExit1() {
      document.getElementById('desenho').style.display = 'flex';
    }

  const [cards, setCards] = useState(null);

  return (
    <div className="h-screen w-full ">
          <div className="flex flex-col gap-3 items-center pb-8 ">

        <div className='flex items-center justify-around flex-col md:py-8'>
          {/** tab verde */}
          <div className='w-[100vw] md:w-[620px] h-[200px] flex justify-center bg-[#62804D] shadow-4xl mb-5 md:mt-5 z-20'>
            <span className='w-[55px] h-[55px] absolute my-2 ' >
              <div className='w-[55px] h-[55px] rounded-full absolute bg-[#D12C2C] shadow-3xl'></div>
              <div className='w-[35px] h-[35px] rounded-full absolute bg-[#CE4040] left-[3px] top-[5px] shadow-4xl'></div>
              <div className='w-[35px] h-[35px] rounded-full absolute bg-[#CE4040] left-[3px] top-[5px] shadow-4xl'></div>
            </span>
            <h1 className=" text-[100px] text-center text-[#ffff] pt-10 my-5">
              Posta aí!
            </h1>          
          </div>
          
          {/** tab escolhas */}

          <div className=' flex justify-center flex-col'> 
            <h3 className='text-[52px] text-center'>Faça sua escolha:</h3>
            <span className='flex flex-row pl-5'>
            <img onClick={onExit} src={imgChoiceEscrita} alt="" className=' hover:-rotate-12 duration-300 cursor-pointer w-[40vw] md:max-w-[250px]'/>
            <img onClick={onExit1} src={imgChoiceDesenho} alt="" className=' hover:rotate-12 duration-300 cursor-pointer w-[40vw] md:max-w-[250px]'/>
            </span>
          </div>


          <Quadro setCards={setCards}/>    
          <Forma  setCards={setCards}/> 
        
       
        </div>

        <div id='Panel' className='flex z-[-1] h-[500px] gap-6 flex-wrap max-w-[1300px] pt-[5rem] justify-center'>
            {cards==null ?  
            <span>
              <span className=' animate-bounce h-10 flex flex-col items-center gap-2'>  
                <span className='animate-spin w-10 h-10 bg-jasmine'></span>
              </span>
              <h5 className=' text-[48px]'>Carregando...</h5>
            </span>
            :
            cards.map((card, index) => (
              <Card
                note={card.note}
                author={card.author}
                key={card.index}
                image={card.image}
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

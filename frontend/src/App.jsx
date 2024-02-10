import './index.css'
import imgChoiceDesenho from './assets/desenhar.svg';
import imgChoiceEscrita from './assets/escrever.svg';

import CardPost from './components/CardPost';
import Formulario from './components/Formulario';
import Quadro from './components/Quadro';
import Inputs from './components/Inputs';

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

  const [cards, setCards] = useState(null);
  
  const [quadro, setQuadro] = useState(false);
  const [inputs, setInputs] = useState(false);

  function open(set) {
    window.scrollTo({
      top: 100,
      behavior: 'smooth'
    });
    document.body.style.overflow = 'hidden'
    set(true);
  }

  return (
    <div className=" w-full h-[600px] flex items-center flex-col mb-50">

        <div className='flex items-center flex-col md:py-8'>

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
          
          <div className=' flex justify-center flex-col'> 
            <h3 className='text-[52px] text-center'>Faça sua escolha:</h3>
            <span className='flex flex-row pl-5'>
            <img onClick={() => open(setInputs)} src={imgChoiceEscrita} alt="" className=' hover:-rotate-12 duration-300 cursor-pointer w-[40vw] md:max-w-[250px]'/>
            <img onClick={() => open(setQuadro)} src={imgChoiceDesenho} alt="" className=' hover:rotate-12 duration-300 cursor-pointer w-[40vw] md:max-w-[250px]'/>
            </span>
          </div>

              {
            inputs?
              <Formulario setCards={setCards} Quadro={Inputs} setQuadro={setInputs}/> 
              : quadro? 
              <Formulario setCards={setCards} Quadro={Quadro} setQuadro={setQuadro}/> 
              : ""
             }
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
              <CardPost
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

  )
}

export default App

import './index.css'
import iconQueroDesenhar from './assets/queroDesenhar.svg';
import iconQueroEscrever from './assets/queroEscrever.svg';
import iconGithub from './assets/github.svg';

import PostIt from './components/PostIt';
import Formulario from './components/Formulario';
import Quadro from './components/InputDesenho';
import Inputs from './components/InputEscrita';

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

  function navegar(link) {
    window.open(link);
  }

  return (
    <div className=" w-full h-[600px]  flex items-center flex-col ">
      <div className='w-[100%] h-12 py-4 pr-3 absolute justify-end gap-2 flex items-center cursor-pointer z-50 max-w-[1200px]'>
          <h4 onClick={() => navegar('https://www.artttur.com/')} className='text-[30px] align-middle hover:text-[#D4874D]'>arttturslv</h4>
          <div onClick={() => navegar('https://github.com/arttturslv')}  className='relative flex items-center justify-center '>
            <img className='w-10 h-10  hover:backdrop-filter-none ' src={iconGithub} alt="" />
            <div className=' bg-[#ff892f] w-8 h-8 absolute rounded-full opacity-0 hover:opacity-50'></div>
          </div>
      </div>
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
            <img onClick={() => open(setInputs)} src={iconQueroEscrever} alt="" className=' hover:-rotate-12 duration-300 cursor-pointer w-[40vw] md:max-w-[250px]'/>
            <img onClick={() => open(setQuadro)} src={iconQueroDesenhar} alt="" className=' hover:rotate-12 duration-300 cursor-pointer w-[40vw] md:max-w-[250px]'/>
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

        <div id='Panel' className='flex z-[-1]  gap-6 flex-wrap max-w-[1300px] pt-[5rem] pb-[5rem]  justify-center'>
            {cards==null ?  
            <span>
                  <div className=' w-[200px] h-[200px] bg-jasmine flex-col shadow-4xl flex justify-center text-[#2D2A2A] items-center gap-2'>  
                  <svg className='animate-spina' width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M78.6186 84.9817C63.7956 101.503 40.1765 105.798 21.3924 92.4486C-5.98802 72.9903 -7.36389 33.4333 18.8753 12.0957C29.3344 3.5903 43.702 -1.60048 57.5195 0.445103C74.7663 2.99837 83.8997 16.67 89.2402 30.4695C91.0604 35.1725 91.9704 39.2534 91.9289 43.4817C94.292 41.8009 97.5846 42.2432 99.414 44.5384C101.307 46.9138 100.916 50.3742 98.5411 52.2675C97.2274 53.3145 95.9734 54.8394 94.2611 56.9215L94.2598 56.9231C93.8768 57.3888 93.4709 57.8823 93.0363 58.4046C91.0338 60.8113 88.1595 64.1566 84.4568 65.8674C81.8746 67.0606 79.5324 66.1931 78.3018 65.4562C77.1246 64.7514 76.2559 63.7976 75.6921 63.0995C74.5142 61.641 73.4671 59.7677 72.6409 58.1074C71.7798 56.3772 71.0049 54.5631 70.4141 53.0331C69.8774 51.6433 69.3358 50.089 69.1272 49.0246C68.5428 46.0437 70.4856 43.1536 73.4664 42.5692C76.4451 41.9853 79.3332 43.9248 79.9205 46.902C79.9185 46.8922 79.9176 46.8871 79.9178 46.887C79.9192 46.8867 79.9621 47.0606 80.0951 47.4644C80.1581 47.6555 80.2324 47.8717 80.3174 48.1093C80.7179 46.3382 80.9145 44.8325 80.9294 43.382C80.9546 40.9297 80.4606 38.2611 78.9817 34.4397C74.0863 21.7905 67.1354 12.9886 55.9086 11.3265C45.7417 9.82139 34.3921 13.6554 25.8154 20.63C5.21774 37.3799 6.31084 68.2358 27.7645 83.4822C41.4766 93.2268 58.9077 90.4793 70.4309 77.6357C72.4595 75.3748 75.9368 75.1864 78.1977 77.2149C80.4587 79.2434 80.6471 82.7207 78.6186 84.9817ZM79.9205 46.902C79.9209 46.9042 79.9213 46.9063 79.9217 46.9085L79.9215 46.9072C79.9211 46.9054 79.9208 46.9036 79.9205 46.902Z" fill="#2D2A2A"/>
                  </svg>   
              </div>
            </span>
            :
            cards.map((card, index) => (
              <PostIt
                note={card.note}
                author={card.author}
                key={index}
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

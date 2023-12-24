import './index.css'
import Card from './components/Card';

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
  }
  
  return (
    <div className="h-screen w-full ">
          <div className="flex flex-col gap-3 items-center">

        <div className='flex items-center h-[300px] justify-around flex-col '>
          <h1 className="text-[5vw] text-center text-[#ffff] font-bold">
            Posta aí!
          </h1>
          <div>

            <form className='flex gap-5 items-end'>
              <div>
                <label htmlFor="mensagem" className="text-sm font-medium ">Mensagem</label>
                <input type="search" className="disabled:bg-slate-50 invalid:border-pink-500 w-full p-4 ps-10 text-sm placeholder-[#6f6363] text-seal-brown font-medium border  rounded-lg bg-jasmine" placeholder="Eae galera, como vocês estão?" required></input>
              </div>

              <div>
                <label htmlFor="mensagem" className="text-sm font-medium ">Autor</label>
                <input type="search" className="w-full p-4 ps-10 text-sm placeholder-[#6f6363] text-seal-brown font-medium border rounded-lg bg-jasmine" placeholder="Artur" ></input>
              </div>

              <button type="button" className='h-[55px] px-4 rounded-lg text-sm text-seal-brown border-2 font-medium border-[#ffff] bg-jasmine hover:bg-[#553029] hover:text-[#fff]'>Colar</button>
            </form>

          </div>
        </div>
        <div id='Panel' className='flex h-[500px] gap-6 flex-wrap max-w-[1300px] pt-10'>
        <Card note="Eae galera, como vocês estão?" color={changeColor()}  author="Artur"></Card>
        <Card note="FELIZ NATAL" color={changeColor()} author="Artur"></Card>
        <Card note="TESTE21" color={changeColor()} author="Artur"></Card>
        <Card note="#Brasilsil!" color={changeColor()} author="Artur"></Card>
        <Card note="😁😀😀" color={changeColor()} author="Artur"></Card>
        </div>
    </div>
    </div>

  )
}

export default App

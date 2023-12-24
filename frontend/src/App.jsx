import './index.css'
import Card from './components/Card';

function App() {

  return (
    <div className="h-screen w-full max-w-[1600px] ">
          <div className=" ">

        <div className='flex items-center h-[300px] justify-around flex-col '>
          <h1 className="text-[5vw] text-center text-[#ffff] font-bold">
            Poste isso!
          </h1>
          <div>

            <form className='flex gap-5 items-end'>
              <div>
                <label htmlFor="mensagem" className="text-sm font-medium ">Mensagem</label>
                <input type="search" className="disabled:bg-slate-50 invalid:border-pink-500 w-full p-4 ps-10 text-sm placeholder-seal-brown text-seal-brown font-medium border  rounded-lg bg-jasmine" placeholder="Eae galera, como vocês estão?" required></input>
              </div>

              <div>
                <label htmlFor="mensagem" className="text-sm font-medium ">Autor</label>
                <input type="search" className="w-full p-4 ps-10 text-sm placeholder-seal-brown text-seal-brown font-medium border rounded-lg bg-jasmine" placeholder="Artur" ></input>
              </div>

              <button type="button" className='h-[55px] px-4 rounded-lg text-sm text-seal-brown border-2 font-medium border-[#ffff] bg-jasmine hover:bg-[#553029] hover:text-[#fff]'>Colar</button>
            </form>

          </div>
        </div>
        <div className='flex h-[500px] gap-4 flex-wrap'>
          <Card note="Eae galera, como vocês estão?" author="Artur"></Card>
          <Card note="Eae galera, como vocês estão?" author="Artur"></Card>
          <Card note="Eae galera, como vocês estão?" author="Artur"></Card>
          <Card note="Eae galera, como vocês estão?" author="Artur"></Card>
          <Card note="Eae galera, como vocês estão?" author="Artur"></Card>
          <Card note="Eae galera, como vocês estão?" author="Artur"></Card>
          <Card note="Eae galera, como vocês estão?" author="Artur"></Card>

        </div>
    </div>
    </div>

  )
}

export default App

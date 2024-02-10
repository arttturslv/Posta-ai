import { useEffect, useState } from "react";

export default function Inputs({trash, setTrashContent}) {
    const [authorHolder, setAuthorHolder] = useState('');
    const [messageHolder, setMessageHolder] = useState('');

    function handleChange(e) {
        localStorage.setItem(e.target.id, e.target.value);
        localStorage.setItem('formulario', 'text');


        setAuthorHolder(localStorage.getItem('Author'));
        setMessageHolder(localStorage.getItem('Message'));
    }

    useEffect(()=> {
        setAuthorHolder("Artur");
        setMessageHolder("Eae galera, tudo certo com vocês?");
    }, []);
    
    useEffect(()=> {
        limpar();
        setTrashContent(false);    
      }, [trash])
  
      function limpar() {
        setAuthorHolder("Artur");
        setMessageHolder("Eae galera, tudo certo com vocês?");
        document.getElementById("Author").value = ""
        document.getElementById("Message").value = ""
    }

    return (
    <div className={'h-auto w-[90vw] max sm:w-[500px] md:w-[500px] relative px-10 py-5 text-[#2D2A2A] flex flex-col gap-1 shadow-2xl bg-[#DAC285] '}>
        <div> 
            <h5 className="text-[42px] md:text-[52px]">Autor:</h5>
            <input onChange={handleChange} id="Author" type="text" maxLength={14} className=" w-full ps-1 md:ps-8 h-[50%] text-[32px] md:text-[42px] placeholder-[#704747] focus:outline-none focus:bg-white border-[#DC9C64] border-4 focus:border-[#DC9C64] rounded-lg bg-[#E78B61]" placeholder={authorHolder} />
        </div>
        <div> 
            <h5 className="text-[42px] md:text-[52px]">*Mensagem:</h5>
            <textarea onChange={handleChange} id="Message" type="text" maxLength={120} className=" w-full ps-1 md:ps-8 py-2 overflow-y-auto  text-[32px] md:text-[42px] placeholder-[#704747] focus:outline-none focus:bg-white border-[#DC9C64] border-4 focus:border-[#DC9C64] rounded-lg bg-[#E78B61]" placeholder={messageHolder} />
        </div>
    </div>
    )
}
import { useEffect, useState } from "react"
import shareSVG from '../assets/share.svg'
import html2canvas from 'html2canvas';
export default function PostIt({note, author, image, color}) {

    function share(e) {    
        const title = "Posta Aí!";
        const div = e.currentTarget;
        
        // Cria um canvas temporário
        const canvas = document.createElement('canvas');
    
        // Define as dimensões do canvas iguais às da div
        canvas.width = div.offsetWidth;
        canvas.height = div.offsetHeight;

        let lastRotate = div.style.transform;

        div.style.transform = 'rotate(0deg)'; 
    
        html2canvas(div).then(function(canvas) {
            canvas.toBlob(function(blob) {
                const file = new File([blob], 'imagem.png', { type: 'image/png' });
                const shareData = {
                    files: [file],
                    title: title,
                };
                if (navigator.share) {
                    navigator.share(shareData)
                        .then(() => console.log("Compartilhado com sucesso!"))
                        .catch((error) => console.log('Erro:', error));
                } else {
                    console.log('API não suportada.');
                    navigator.clipboard.writeText("Acesse o Posta Aí! ->"+url);
                }
            });
        }).catch(function(error) {
            console.error("Erro ao converter div para canvas:", error);
        });
        

        div.style.transform = 'rotate('+lastRotate+'deg)'; 

        
     

    }
    
  
    
    
    
    
    
    function handleClick(e) {
        if(wannaShare) {
            share(e);
            isWannaShare(false);
        } else {
            isWannaShare(true);
        }
    }

    const [wannaShare, isWannaShare] = useState(false);

    function handleHover() {
        isWannaShare(true)
    }

    return (
    <div onClick={handleClick} onMouseEnter={handleHover} className='cardo group h-[200px] w-[200px] cursor-pointer'>

        <div className="share group-hover:animate-up group-hover:top-[-20%] group-hover:z-1 z-0 absolute w-[200px] flex-col flex items-center justify-end text-center pointer-events-none ">
            <img className="w-10" src={shareSVG} alt="" />
        </div>

        <div className={'inside h-[200px] relative w-[200px] text-[#2D2A2A] gap-2 flex flex-col break-words shadow-2xl px-2 pt-2 '} style={{backgroundColor: color}}>
            {image==null?
                <><h2 className=" h-[80%] text-[30px] font-light text-wrap max-w-[100%]">{note}</h2>
                <h6 className="h-[0%] text-[25px] underline text-[#130c16] pr-2 text-right font-medium ">{author}</h6></>
            : 
                <><img className="" src={image} alt=""/>
                <h6 className=" text-[25px] underline relative bottom-7 text-[#130c16] pr-2 text-right font-medium ">{author}</h6></>

            }
        </div>
    </div>
    )
}
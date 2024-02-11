import { useEffect, useState } from "react"
import shareSVG from '../assets/share.svg'

export default function CardPost({note, author, image, color}) {

    async function share(e) {
        const title = "Posta Aí!";
        const text = "Dá uma olhada nisso!";
        const url = 'poste-ai-front.vercel.app/';
    
        try {
            const imageFile = await divParaImg(e.target);
            
            if (navigator.share) {
                await navigator.share({
                    files: [imageFile],
                    title:title,
                    text:text,
                    url:url,
                });
                console.log("Compartilhado com sucesso!");
            } else {
                console.log('API não suportada.');
                await navigator.clipboard.writeText("Acesse o Posta Aí! ->" + url);
            }
        } catch (error) {
            console.error('Erro ao compartilhar:', error);
        }
    }
    
    function divParaImg(div) {
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${div.offsetWidth}" height="${div.offsetHeight}">${new XMLSerializer().serializeToString(div.firstChild)}</svg>`;
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        return new File([blob], 'imagem.svg', { type: 'image/svg+xml' });
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
    <div onClick={handleClick} onMouseEnter={handleHover} className='cardo  h-[200px] w-[200px] cursor-pointer'>

        <div className="share absolute w-[200px] flex-col flex items-center justify-end text-center pointer-events-none ">
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
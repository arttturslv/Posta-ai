import { useEffect } from "react"

export default function CardPost({note, author, image, color, id}) {

    useEffect(() => {
        const doc =  document.getElementById(id);
        if(!doc) return;
        doc.style.display = 'none';

    }, [id])


    function share () {
        
    }

    return (
    <div  className='cardo h-[200px] w-[200px] cursor-pointer'>
        <div className="share absolute w-[200px] pointer-events-none ">
            <img className="w-10" src="https://static-00.iconduck.com/assets.00/share-icon-512x478-pbc2yd90.png" alt="" srcset="" />
        </div>

        <div className={' h-[200px] w-[200px] text-[#2D2A2A] gap-2 flex flex-col break-words shadow-2xl px-2 pt-2 '} style={{backgroundColor: color}}>
            {image==null?
                <><h2 className=" h-[80%] text-[30px] font-light text-wrap max-w-[100%]">{note}</h2>
                <h6 className="h-[0%] text-[25px] underline text-[#130c16] pr-2 text-right font-medium ">{author}</h6></>
            : 
                <img src={image} alt=""/>
            }
        </div>
    </div>
    )
}

export default function CardPost({note, author, image, color}) {
    return (
    <div className={'h-[200px] w-[200px] text-[#2D2A2A] gap-2 z-1 flex flex-col break-words shadow-2xl px-2 pt-2 '} style={{backgroundColor: color}}>
        {image==null?
        <>
            <h2 className=" h-[80%] text-[30px] font-light text-wrap max-w-[100%]">{note}</h2>
            <h6 className="h-[0%] text-[25px] underline text-[#130c16] pr-2 text-right font-medium ">{author}</h6>
        </>
        : 
        <img src={image} alt=""/>
        }
        </div>
    )
}
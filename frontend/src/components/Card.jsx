
export default function Card({note, author, color}) {


    return (

    <div className={'h-[200px] w-[200px] flex flex-col break-words shadow-2xl px-2 pt-4 '} style={{backgroundColor: color}}>
        <h2 className=" h-[80%]  text-[#514] font-light text-wrap max-w-[100%]">{note}</h2>
        <h6 className="h-[20%] w-[100%] text-[#514] pr-4 text-right font-medium ">{author}</h6>
    </div>
    )
}
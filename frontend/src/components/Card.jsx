
export default function Card({note, author, color}) {


    return (

    <div className={'h-[200px] w-[200px] flex p-2 pt-4 '} style={{backgroundColor: color}}>
        <h2 className=" h-[80%] text-[#514] font-light ">{note}</h2>
        <h6 className="h-[20%] text-[#514] self-end pr-4 font-medium">{author}</h6>
    </div>
    )
}
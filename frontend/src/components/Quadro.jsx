import Input from "./input" 

export default function Forma() {
    return (
    <div className="w-screen h-screen backdrop-blur-sm absolute flex justify-center top-[270px]">
        <div className={'w-[90vw] max-w-[500px] gap-3 flex flex-col shadow-2xl absolute '}>
            <Input/>
            <div className="inline-flex gap-3">
                <div className="bg-[#DAC285] w-[50%] text-center cursor-pointer shadow-4xl active:shadow-5xl active:shadow-6xl">
                    <h5 className="text-[52px] text-[#2B5443]">Postar</h5>
                </div>
                <div className="bg-[#DAC285] w-[50%] text-center cursor-pointer shadow-4xl active:shadow-5xl active:shadow-6xl">
                    <h5 className="text-[52px] text-[#D04646]">Cancelar</h5>
                </div>
            </div>
        </div>
    </div>
    )
}

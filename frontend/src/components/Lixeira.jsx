export default function Trash ({setTrashContent}) {

    function levanta() {
        document.querySelectorAll('.tampa').forEach(e => e.classList.add('tampaAnim'));
        document.querySelectorAll('.bin').forEach(e => e.classList.add('trashBin'));
    }
    function abaixa() {
        document.querySelectorAll('.tampa').forEach(e => e.classList.remove('tampaAnim'));
        document.querySelectorAll('.bin').forEach(e => e.classList.remove('trashBin'));
    }

    function del() {
        document.querySelectorAll('.lixeira').forEach(e => e.classList.add('trash'));
        setTimeout(()=> {
            document.querySelectorAll('.lixeira').forEach(e => e.classList.remove('trash'));
        }, 400)
        setTrashContent(true);
    }

    return (
        <div onMouseLeave={abaixa} onClick={del} onMouseEnter={levanta} className="bg-[#DAC285] overflow-hidden w-[50px] h-[60px] relative text-center cursor-pointer py-3 shadow-4xl active:shadow-5xl active:shadow-6xl">
            <div className="lixeira  w-[100%] h-[100%] flex-col flex items-center absolute transition-all duration-[1000] top-0 ">
            <div className="tampa bin rounded-sm bg-[#2D2A2A] w-[65%]  h-1 absolute transition-all top-[35%] "></div>
            <div className=" bin bg-[#2D2A2A] w-5 h-[2px] absolute bottom-[30px] "></div>
            <div className=" bin rounded-sm	bg-[#2D2A2A] w-[35%]  absolute bottom-3 h-1"></div>
            <div className=" bin rounded-sm	bg-[#2D2A2A] w-[7%] h-6 rotate-[15deg] right-3 absolute bottom-3"></div>
            <div className=" bin rounded-sm	bg-[#2D2A2A] w-[7%]  h-6 -rotate-[15deg] left-3 absolute bottom-3"></div>
            <div className="bin bg-[#2D2A2A] w-[1px] h-3 -rotate-[15deg] left-[40%] absolute bottom-4"></div>
            <div className="bin bg-[#2D2A2A] w-[1px] h-3 rotate-[15deg] right-[43%] absolute bottom-4"></div>
            </div>
        </div>
    );
}
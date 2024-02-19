export default function Trash ({setTrashContent}) {

    function liftLid() {
        document.querySelectorAll('.lid').forEach(e => e.classList.add('lidAnimation'));
        document.querySelectorAll('.binColor').forEach(e => e.classList.add('binNewColor'));
    }
    function closeLid() {
        document.querySelectorAll('.lid').forEach(e => e.classList.remove('lidAnimation'));
        document.querySelectorAll('.binColor').forEach(e => e.classList.remove('binNewColor'));
    }

    function deleteInput() {
        document.querySelectorAll('.bin').forEach(e => e.classList.add('binAnimation'));
        setTimeout(()=> {
            document.querySelectorAll('.bin').forEach(e => e.classList.remove('binAnimation'));
        }, 400)
        setTrashContent(true);
    }

    return (
        <div onMouseLeave={closeLid} onClick={deleteInput} onMouseEnter={liftLid} className="bg-[#DAC285] overflow-hidden w-[50px] h-[60px] relative text-center cursor-pointer py-3 shadow-4xl active:shadow-5xl active:shadow-6xl">
            <div className="bin w-[100%] h-[100%] flex-col flex items-center absolute transition-all duration-[1000] top-0 ">
                <div className="lid binColor rounded-sm bg-[#2D2A2A] w-[65%]  h-1 absolute transition-all top-[35%] "></div>
                <div className="binColor bg-[#2D2A2A] w-5 h-[2px] absolute bottom-[30px] "></div>
                <div className="binColor rounded-sm	bg-[#2D2A2A] w-[35%]  absolute bottom-3 h-1"></div>
                <div className="binColor rounded-sm	bg-[#2D2A2A] w-[7%] h-6 rotate-[15deg] right-3 absolute bottom-3"></div>
                <div className="binColor rounded-sm	bg-[#2D2A2A] w-[7%]  h-6 -rotate-[15deg] left-3 absolute bottom-3"></div>
                <div className="binColor bg-[#2D2A2A] w-[1px] h-3 -rotate-[15deg] left-[40%] absolute bottom-4"></div>
                <div className="binColor bg-[#2D2A2A] w-[1px] h-3 rotate-[15deg] right-[43%] absolute bottom-4"></div>
            </div>
        </div>
    );
}
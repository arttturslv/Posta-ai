/** @format */

import "./index.css";
import iconQueroDesenhar from "./assets/queroDesenhar.svg";
import iconQueroEscrever from "./assets/queroEscrever.svg";
import pin from "./assets/pin.png";

import iconGithub from "./assets/github.svg";

import PostIt from "./components/PostIt";
import PostItSkeleton from "./components/PostItSkeleton";
import Formulario from "./components/Formulario";
import Quadro from "./components/InputDesenho";
import Inputs from "./components/InputEscrita";
import { POSTIT_COLORS, getRotation } from "./constants/colors";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const API = import.meta.env.VITE_API;

  const [lastID, setLastID] = useState(null);
  const [hasToShow, setHasToShow] = useState(true);
  const [cards, setCards] = useState(null);
  const [quadro, setQuadro] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [loading, setLoading] = useState(false);

  const observerTarget = useRef(null);
  const lastIDRef = useRef(lastID);
  const hasToShowRef = useRef(hasToShow);
  const loadingRef = useRef(loading);

  useEffect(() => {
    lastIDRef.current = lastID;
  }, [lastID]);

  useEffect(() => {
    hasToShowRef.current = hasToShow;
  }, [hasToShow]);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    receber();
  }, []);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target || !hasToShow) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current && hasToShowRef.current) {
          receber();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasToShow, loading, lastID]);

  function getCardColor(index) {
    return POSTIT_COLORS[index % POSTIT_COLORS.length];
  }

  function getLastID(data) {
    let length = data.length;
    return data[length - 1]._id;
  }

  async function receber() {
    if (!hasToShowRef.current || loadingRef.current) return;

    setLoading(true);

    const headers = new Headers();
    headers.append("Content-type", "application/json; charset=UTF-8");

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    try {
      const response = await fetch(`${API}/${lastIDRef.current}`, requestOptions);

      if (response.status === 204) {
        setHasToShow(false);
        return;
      }

      if (!response.ok) {
        throw new Error("Erro ao recuperar dados da API: " + response.status);
      }

      const json = await response.json();
      const data = json.data;

      if (!data || data.length === 0) {
        setHasToShow(false);
        return;
      }

      atualizaCards(data);
      setLastID(getLastID(data));

      if (data.length < 10) {
        setHasToShow(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function atualizaCards(data) {
    if (lastIDRef.current != null) {
      setCards((prevPosts) => (prevPosts ? [...prevPosts, ...data] : data));
    } else {
      setCards(data);
    }
  }

  function open(set) {
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
    document.body.style.overflow = "auto";
    document.body.style.touchAction = "none";

    set(true);
  }

  function navegar(link) {
    window.open(link);
  }

  return (
    <div className="z-[-1] w-full overflow-hidden flex items-center flex-col pb-10">
      <div className="w-[100%] h-12 py-4 pr-3 absolute justify-end gap-2 flex items-center cursor-pointer z-50 max-w-[1200px]">
        <h4
          onClick={() => navegar("https://www.artttur.com/")}
          className="text-[30px] align-middle hover:text-[#D4874D]"
        >
          arttturslv
        </h4>
        <div
          onClick={() => navegar("https://github.com/arttturslv")}
          className="relative flex items-center justify-center "
        >
          <img
            className="w-10 h-10 hover:backdrop-filter-none "
            src={iconGithub}
            alt=""
          />
          <div className=" bg-[#ff892f] w-8 h-8 absolute rounded-full opacity-0 hover:opacity-50"></div>
        </div>
      </div>
      <div className="flex items-center flex-col md:py-8">
        <div className="w-[100vw] md:w-[620px] h-[200px] flex justify-center bg-[#62804D] shadow-4xl mb-5 md:mt-5 z-20">
          <img src={pin} className="w-[80px] absolute my-2" alt="" />
          <h1 className=" text-[100px] text-center text-[#ffff] pt-10 my-5">
            Posta aí!
          </h1>
        </div>

        <div className=" flex justify-center flex-col">
          <h3 className="text-[52px] text-center">Faça sua escolha:</h3>
          <span className="flex flex-row pl-5">
            <img
              onClick={() => open(setInputs)}
              src={iconQueroEscrever}
              alt=""
              className=" hover:-rotate-12 duration-300 cursor-pointer w-[40vw] md:max-w-[250px]"
            />
            <img
              onClick={() => open(setQuadro)}
              src={iconQueroDesenhar}
              alt=""
              className=" hover:rotate-12 duration-300 cursor-pointer w-[40vw] md:max-w-[250px]"
            />
          </span>
        </div>

        {inputs ? (
          <Formulario
            setCards={setCards}
            Quadro={Inputs}
            setQuadro={setInputs}
          />
        ) : quadro ? (
          <Formulario
            setCards={setCards}
            Quadro={Quadro}
            setQuadro={setQuadro}
          />
        ) : (
          ""
        )}
      </div>

      <div
        id="Panel"
        className="flex z-[1] gap-6 flex-wrap max-w-[1300px] pt-[6rem] pb-[2rem] justify-center"
      >
        {cards == null ? (
          <PostItSkeleton count={8} startIndex={0} />
        ) : (
          <>
            <AnimatePresence>
              {cards.map((card, index) => (
                <motion.div
                  key={card._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: getRotation(index),
                  }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.25,
                    zIndex: 20,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PostIt
                    note={card.note}
                    author={card.author}
                    id={card._id}
                    image={card.image}
                    color={getCardColor(index)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && <PostItSkeleton count={6} startIndex={cards.length} />}
          </>
        )}
      </div>
      {hasToShow && <div ref={observerTarget} className="h-10 w-full pointer-events-none" />}
    </div>
  );
}

export default App;

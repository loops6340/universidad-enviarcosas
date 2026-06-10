"use client";

import { useRef } from "react";

const FormularioAntiBot = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="bg-[url(https://booru.skewfruit.com/_images/c5c87e9fad15889a5e0754f4e8b6a1aa/16%20-%20artist%3Aloops%20character%3Amikami_arisa%20meta%3A2025%20meta%3Aoc.png)] bg-contain  items-center justify-center flex w-screen h-screen z-50 bg-white absolute p-2">
      <form
        action=""
        className="border-2 border-black rounded p-5 flex z-50 gap-5 flex-col w-60 bg-[#73697a]"
        onSubmit={(e) => {
          e.preventDefault();
          ref.current!.style = "display: none;";
        }}
      >
        <h1 className="font-bold">Formulario anti bots :'v</h1>
        <input className="focus:outline-0 rounded border-2 border-black bg-white p-2" type="text" placeholder="ola" />
        <textarea className="focus:outline-0 rounded border-2 border-black bg-white p-2" name="" id="" placeholder="soigei"></textarea>
        <button className="hover:bg-violet-500 transition rounded border-2 border-black bg-violet-600 p-2 text-white">aseptar</button>
      </form>
    </div>
  );
};

export default FormularioAntiBot;

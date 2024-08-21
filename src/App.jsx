import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  let [password, setPassword] = useState("");
  let [length, setLength] = useState(8);
  let [numberAllowed, setnumberAllowed] = useState(false);
  let [characterAllowed, setCharacterAllowed] = useState(false);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "*-{[})](/,.'`~@#%&^$";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [numberAllowed, characterAllowed, length, setPassword]);

  useEffect(() => passwordGenerator(), [length, numberAllowed, characterAllowed, passwordGenerator]);
  const passwordRef = useRef(null);
  const copyToClipBoard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    if(passwordRef.current!==null) passwordRef.current.select();
  }, [password]);

  return (
    <>
      <div className="w-full h-screen bg-white flex flex-wrap shrink-0 items-center justify-center rounded">
        <div className="rounded w-1/2 h-1/4 bg-gray-800 text-white shadow-md ">
          <div className=" text-center m-3">
            <h1 className="text-center text-2xl text-white font-semibold">Password Generator</h1>
          </div>
          <div className="flex w-full items-center p-2">
            <input ref={passwordRef} className="flex h-10 w-full rounded-md text-black  border-r-0 bg-white px-3 py-2 text-sm placeholder:text-gray-600 outline-none " type="text" placeholder="Password" value={password} readOnly />
            <button onClick={copyToClipBoard} type="button"  className=" h-11 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline  focus-visible:outline-black">
              copy
            </button>
          </div>
          <div className="flex flex-wrap overflow-hidden gap-4 px-3">
            <input
              onChange={(e) => {
                setLength(e.target.value);
              }}
              type="range"
              min={6}
              max={20}
              className="outline-none"
              value={length}
              name="password"
            />
            <label>Length:{length}</label>

            <input onChange={() => setnumberAllowed((prev) => !prev)} defaultChecked={numberAllowed} type="checkbox" name="numbers" id="numberAllowed" />
            <label htmlFor="numberAllowed">Numbers</label>
            <input onChange={() => setCharacterAllowed((prev) => !prev)} defaultChecked={characterAllowed} type="checkbox" name="characters" id="characterAllowed" />
            <label htmlFor="characterAllowed">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

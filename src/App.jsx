import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length , setLength] = useState(0);
  const [number , numberAllowed] = useState(false);
  const [character , characterAllowed] = useState(false);
  const [password , setPassword] = useState('hello')
  const references = useRef(null);
  const passwordGenerator= useCallback(()=>{
    let pass = '';
    let str = 'ABCDEFGHIJKLMnopqrstuvw';
    if(number) str += '123456789';
    if(character) str += '!@#$%(*&^%';
    for(let i= 0; i < length ; i++){
      let char = Math.floor(Math.random()* str.length +1);
      pass +=  str.charAt(char)
    }

    setPassword(pass)
  },[length , number, setPassword, character])

  useEffect(()=>{
    passwordGenerator();

  } ,[setPassword , passwordGenerator , length , number , character])

  const copypassword = useCallback(()=>{
    references.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])
  
  return (
    
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
        ref={references}
            type="text"
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            value={password}

        />
        <button
        onClick={copypassword}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        min={1}
        max={100}
        value={length}
        onChange={(e)=>{setLength(e.target.value)}}
        type="range"
         className='cursor-pointer'
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
      defaultChecked={number}
          type="checkbox"
          id="numberInput"
          onChange={()=>{
            numberAllowed((prev)=>!prev)
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
          defaultChecked={character}
              type="checkbox"
              id="characterInput"
              onChange={(e)=>{
                characterAllowed((prev)=>!prev)
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    
  )
}

export default App
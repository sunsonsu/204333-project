'use client';

import { DefaultProp } from '@/interface/page'
import React, { createContext, useState } from 'react'
import style from "./load.module.css";

// Context
export const LoadContext = createContext<(s:boolean)=>void>(()=>{});

export default function LoadProvider(prop:DefaultProp) {
    const [status, setStatus] = useState<boolean>(false);

    function onLoad(s:boolean) {
        setStatus(s);
    }

  return (
    <LoadContext.Provider value={onLoad}>
        {status ? <div className='w-screen h-screen fixed z-30 bg-black/50 flex items-center justify-center'>
            <div className={style.loader}></div>
        </div> : <></>}
        {prop.children}
    </LoadContext.Provider>
  )
}

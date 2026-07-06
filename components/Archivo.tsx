"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Codigo from './Archivo/Codigo'
import ArchivoClientFunc from './Archivo.client-func'
const Archivo = ({ url, readonly }: { url: string, readonly: boolean }) => {
    
    const [data, setData] = useState("")

    const getFile = async () => {
        const res = await axios(url)
        return res.data;
    }

    useEffect(() => {
        (async () => {
            setData(await getFile());
        })()
    }, [])

    const types = {
        image: ['png', 'jpg', 'jpeg', 'webp'],
        langs: ['txt', 'psc', 'cpp']
    }

    if (types.image.some(e => url.includes(e))) {
        return <img src={url} className="w-30" alt="" />
    } else {

        return (
            <div>
                <Codigo readOnly={true} dark={readonly} maxHeight="340px" value={data} />
                <ArchivoClientFunc content={data}/>
            </div>


            // <p className='bg-gray-500 text-white rounded p-2 border border-black whitespace-pre'>
            //     {`${res.data}`}
            // </p>
        )
    }
}

export default Archivo
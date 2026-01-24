import React from 'react'
import axios from 'axios'
import Codigo from './Archivo/Codigo'
import ArchivoClientFunc from './Archivo.client-func'

const Archivo = async ({ url }: { url: string }) => {

    const res = await axios(url)

    const types = {
        image: ['png', 'jpg', 'jpeg', 'webp'],
        langs: ['txt', 'psc', 'cpp']
    }

    if (types.image.some(e => url.includes(e))) {
        return <img src={url} className="w-200" alt="" />
    } else {

        return (
            <div>
                <Codigo readOnly={true} dark={true} maxHeight="340px" value={res.data} />
                <ArchivoClientFunc content={res.data}/>
            </div>


            // <p className='bg-gray-500 text-white rounded p-2 border border-black whitespace-pre'>
            //     {`${res.data}`}
            // </p>
        )
    }
}

export default Archivo
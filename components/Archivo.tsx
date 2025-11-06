import React from 'react'
import axios from 'axios'
import Codigo from './Archivo/Codigo'

const Archivo = async ({ url }: { url: string}) => {

    const res = await axios(url)

    const types = {
        image: ['png', 'jpg', 'jpeg', 'webp'],
        langs: ['txt', 'psc', 'cpp']
    }

    if (types.image.some(e => url.includes(e))) {
        return <img src={url} alt="" />
    } else {

        return (

            <Codigo data={res.data} />
            // <p className='bg-gray-500 text-white rounded p-2 border border-black whitespace-pre'>
            //     {`${res.data}`}
            // </p>
        )
    }
}

export default Archivo
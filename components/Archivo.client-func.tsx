"use client"
const ArchivoClientFuncs = ({ content }: { content: string }) => {
  
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content)
  }

  return (
    <button onClick={copyToClipboard} className='text-darkmode-light-primary bg-background rounded p-2 mt-2 cursor-pointer'>
        Copiar al portapapeles
    </button>
  )
}

export default ArchivoClientFuncs
type Props = {
    filename: string;
    url: string;
}


const DocumentFileInfoViewer = ({ filename, url }: Props) => {

  
    const extensionImages = [
        {name: "pdf", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/960px-PDF_file_icon.svg.png"},
        {name: "docx", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Microsoft_Office_Word_%282019%E2%80%932025%29.svg/960px-Microsoft_Office_Word_%282019%E2%80%932025%29.svg.png"}
    ]

  return (
    <div className="flex flex-col bg-background p-2">
        <a href={url} className="flex items-center gap-2">
            <img src={extensionImages.find(ex => url.includes(ex.name))?.imageUrl} className='w-10' alt="" />
            <div>{filename}</div>
        </a>
    </div>
  )
}

export default DocumentFileInfoViewer
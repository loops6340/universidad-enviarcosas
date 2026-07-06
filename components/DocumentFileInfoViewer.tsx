import extensionImages from "./DocumentFileExtensions";

type Props = {
    filename: string;
    url: string;
}


const DocumentFileInfoViewer = ({ filename, url }: Props) => {

  return (
    <div className="flex flex-col rounded bg-background p-2">
        <a href={url} className="flex items-center gap-2 text-darkmode-light-primary">
            <img src={extensionImages.find(ex => url.includes(ex.name))?.imageUrl} className='w-10' alt="" />
            <div className="text-dm-light-primary">{filename}</div>
        </a>
    </div>
  )
}

export default DocumentFileInfoViewer
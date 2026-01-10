"use client"
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';

const Codigo = ({data}: {data:any}) => {
  return (
    <CodeMirror className='w-full' value={data} theme={okaidia} extensions={[javascript({ jsx: true })]} />
  )
}

export default Codigo
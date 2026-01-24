"use client"
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';

type Props = {
  readOnly: boolean;
  value: string;
  dark: boolean,
  maxHeight: string;
}

const Codigo = ({readOnly, value, dark, maxHeight }: Props) => {
  return (
    <CodeMirror className='max-w-75 md:max-w-200' maxHeight={maxHeight} readOnly={readOnly} value={value} theme={dark ? okaidia : "light"}  extensions={[javascript({ jsx: true })]} />
  )
}

export default Codigo
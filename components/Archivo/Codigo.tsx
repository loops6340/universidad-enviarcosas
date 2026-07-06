"use client"
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { aura } from '@uiw/codemirror-theme-aura';
import { createTheme } from '@mui/material/styles';
type Props = {
  readOnly: boolean;
  value: string;
  dark: boolean,
  maxHeight: string;
}

const Codigo = ({readOnly, value, dark, maxHeight }: Props) => {
  return (
    <CodeMirror className='max-w-75 md:max-w-200' maxHeight={maxHeight} readOnly={readOnly} value={value} theme={dark ? aura : "light"}  extensions={[javascript({ jsx: true })]} />
  )
}

export default Codigo
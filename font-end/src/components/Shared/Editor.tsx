import { FC, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorInterface {
    getValue: any
}

const Editor: FC<EditorInterface> = ({getValue})=>{
    const [value, setValue] = useState('');

    const handleChange = (txt: any)=>{
        setValue(txt)
        getValue(txt)
    }

  return (
    <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={handleChange} 
        style={{height: 250}} />
  )
}

export default Editor
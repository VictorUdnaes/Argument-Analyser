// @ts-ignore
import React, { useState } from "react";
// @ts-ignore
import ReactQuill, {Quill} from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles

const Delta = Quill.import('delta');

const RichTextEditor = () => {
    const [text, setText] = useState(new Delta()
        .insert('Enter your argument here:', { font: '48px', bold: false})
        .insert('\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n')

    );

    const handleChange = (value: React.SetStateAction<string>) => {
        setText(value);
    };

    return (
        <div className={"TextEditor"}>
            <ReactQuill value={text} onChange={handleChange} defaultValue={text}/>
        </div>
    );
};

export default RichTextEditor;
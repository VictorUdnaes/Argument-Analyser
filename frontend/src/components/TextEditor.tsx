import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles

const RichTextEditor = () => {
    const [text, setText] = useState("");

    const handleChange = (value: React.SetStateAction<string>) => {
        setText(value);
    };

    return (
        <div>
            <h2>Text Editor</h2>
            <ReactQuill value={text} onChange={handleChange} />
            <div>
                <h3>Output</h3>
                <div dangerouslySetInnerHTML={{ __html: text }} />
            </div>
        </div>
    );
};

export default RichTextEditor;
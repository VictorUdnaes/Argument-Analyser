import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React from "react"; // Quill styles

// @ts-expect-error
export default function RichTextEditor({text, onSetRequest}) {
    const handleChange = (value: React.SetStateAction<string>) => {
        onSetRequest(value); // Update the parent state
    };

    return (
        <div className={"TextEditor"}>
            <ReactQuill value={text} onChange={handleChange} defaultValue={text}/>
        </div>
    );
};


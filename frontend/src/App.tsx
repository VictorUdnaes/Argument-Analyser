import './App.css'
import TextEditor from "./components/TextEditor.tsx";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import Banner from "./components/Banner.tsx";
import AnalyseField from "./components/AnalyseField.tsx";
import {useState} from "react";
import {Quill} from "react-quill";

const Delta = Quill.import('delta');

function App() {
    const [requestText, setRequestText] = useState(new Delta()
        .insert('Birds can fly. Penguins cannot fly, therefore penguins are not birds.', {font: '48px', bold: false})
    );
    const [responseText, setResponseText] = useState("");

    return (
        <div className="container">
            <Header/>
            <aside className="left-aside"></aside>
            <Banner/>
            <aside className="right-aside"></aside>
            <main className="main"><TextEditor text={requestText} onSetRequest={setRequestText}/></main>
            <div className="low-content">
                <AnalyseField onGetAnalysis={getAnalysis} responseText={responseText} />
            </div>
            <Footer/>
        </div>
    );

    async function getAnalysis() {
        console.log("fetching analysis...");
        const cleanedText = requestText.replace(/<\/?p>/g, '').replace(/<br>/g, '');
        const query = new URLSearchParams({ text: cleanedText }).toString();
        await fetch(`http://localhost:3000/api/get-analysis/?${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.text()) // Get raw response text
            .then(text => {
                console.log("raw text: " + text);
                return JSON.parse(text); // Attempt to parse JSON
            })
            .then(data => {
                setResponseText(data.message);
                console.log(responseText);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

export default App

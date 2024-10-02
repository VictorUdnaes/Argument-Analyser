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
        .insert('Enter your argument here:', {font: '48px', bold: false})
        .insert('\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n')
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
        const query = new URLSearchParams({ text: requestText }).toString();
        await fetch(`/api/get-analysis/?${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setResponseText(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

export default App

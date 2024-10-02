import './App.css'
import TextEditor from "./components/TextEditor.tsx";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import Banner from "./components/Banner.tsx";
import AnalyseField from "./components/AnalyseField.tsx";

// TODO: extract tutorial into a component that can be toggled on and off

function App() {
    return (
        <div className="container">
            <Header/>
            <aside className="left-aside"></aside>
            <Banner/>
            <aside className="right-aside"></aside>
            <main className="main"><TextEditor/></main>
            <div className="low-content">
                <AnalyseField/>
            </div>
            <Footer/>
        </div>
    );
}

export default App

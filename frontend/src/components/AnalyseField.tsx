import AnalyseAnimation from "./AnalyseAnimation";
import {useState} from "react";

interface AnalyseFieldProps {
    onGetAnalysis?: () => void,
    responseText?: string
}

export default function AnalyseField({onGetAnalysis, responseText}: AnalyseFieldProps) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    function handleGetAnalysis() {
        if (onGetAnalysis) {
            onGetAnalysis();
        } else {
            console.error("No onGetAnalysis function provided");
        }
    }

    return (
        <div className={"low-content"}>
            {responseText ?
                <div className={"analysis-container"}>
                    <AnalyseAnimation isAnalysing={isAnalyzing}/>
                    <button className={"collapse-button"} onClick={() => setIsAnalyzing(!isAnalyzing)}>
                        collapse
                    </button>
                </div> :
                <button className="analyse-button" onClick={() => {
                    setIsAnalyzing(!isAnalyzing);
                    handleGetAnalysis();
                }}>Analyse</button>}
        </div>
    );
}
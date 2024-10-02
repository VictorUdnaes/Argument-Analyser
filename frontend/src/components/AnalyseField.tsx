import { useEffect, useState } from "react";
import AnalyseAnimation from "./AnalyseAnimation";

export default function AnalyseField() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);


    return (
        <div className={"low-content"}>
            {isAnalyzing ?
                <div className={"analysis-container"}>
                    <AnalyseAnimation isAnalysing={isAnalyzing} />
                    <button className={"collapse-button"} onClick={() => setIsAnalyzing(!isAnalyzing)}>collapse</button>
                </div> :
                <button className="analyse-button" onClick={() => setIsAnalyzing(!isAnalyzing)}>Analyse</button>}
        </div>
    );
}
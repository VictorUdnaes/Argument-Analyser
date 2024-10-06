import {useEffect, useState} from "react";
import { marked } from "marked";

interface AnalysisContentProps {
    responeText?: string
}

export default function AnalysisContent({isAnalysing, responeText}) {
    const [dots, setDots] = useState(1);

    useEffect(() => {
        if (isAnalysing) {
            const interval = setInterval(() => {
                setDots(prevDots => (prevDots % 3) + 1);
            }, 500); // Change the interval as needed
            return () => clearInterval(interval);
        }
    }, [isAnalysing]);

    const getMarkdownText = () => {
        const rawMarkup = marked(responeText);
        return { __html: rawMarkup };
    };

    const getDots = (count: number) => {
        let dots = "";
        for (let i = 0; i < count; i++) {
            dots += ".";
        }
        return dots;
    };

    return (
        <div className={"analyse-content"}>
            {responeText ? <div dangerouslySetInnerHTML={getMarkdownText()}/> :
                <div>
                    <span>Analysing</span>
                    <span className="dots">{getDots(dots)}</span>
                </div>
            }
        </div>
    );
}
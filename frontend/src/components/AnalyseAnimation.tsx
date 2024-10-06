import {useEffect, useState} from "react";

interface AnalyseAnimationProps {
    responeText?: string
}

export default function AnalyseAnimation({isAnalysing, responeText}) {
    const [dots, setDots] = useState(1);

    useEffect(() => {
        if (isAnalysing) {
            const interval = setInterval(() => {
                setDots(prevDots => (prevDots % 3) + 1);
            }, 500); // Change the interval as needed
            return () => clearInterval(interval);
        }
    }, [isAnalysing]);

    const getDots = (count: number) => {
        let dots = "";
        for (let i = 0; i < count; i++) {
            dots += ".";
        }
        return dots;
    };

    return (
        <div className={"analyse-animation"}>
            {responeText ? <span>{responeText}</span> :
                <div>
                    <span>Analysing</span>
                    <span className="dots">{getDots(dots)}</span>
                </div>
            }
        </div>
        );
    }
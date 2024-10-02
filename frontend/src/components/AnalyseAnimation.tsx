import {useEffect, useState} from "react";

export default function AnalyseAnimation({isAnalysing}) {
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

    return(
        <div className={"analyse-animation"}>
            <span>Analysing</span>
            <span className="dots">{getDots(dots)}</span>
        </div>
    );
}
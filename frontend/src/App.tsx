import {useEffect, useState} from 'react'
import './App.css'
import TextEditor from "./components/TextEditor";

function App() {
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(function () {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3000/api/test/');
                const resData = await response.json();
                if (!response.ok) {
                    throw new Error(resData.message || 'Fetching failed.');
                }
                setData(resData.message);
            } catch (err) {
                // @ts-ignore
                setError(err.message || 'Fetching failed.');
            }
            setIsLoading(false);
        }

        fetchData();
    }, []);

    data && console.log("Fetch was successful!");

    return (
        <TextEditor />
    )
}

export default App

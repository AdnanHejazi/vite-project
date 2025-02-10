import { useState } from "react";
import axios from "axios";

function RandomButton() {

    const [displayText, setDisplayText] = useState("Placeholder Text");

    const callAPIRandom = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get( "https://labs.bible.org/api/?passage=random&formatting=plain")
            console.log("API Response:", response.data);
            setDisplayText(response.data);
        }
        catch (error){
            console.error("Error fetching data:", error);
        }
        
    };

    return (
        <>
        <h2> { displayText } </h2>
        <p>Press the "Random" button to generate a random verse.</p>
        <form onSubmit={callAPIRandom}>
            <input className="randomButton" type="submit" name="rand" value="Random" />
        </form>
        </>
    )
}

export default RandomButton;
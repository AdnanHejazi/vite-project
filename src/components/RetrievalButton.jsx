import { useState } from "react";
import axios from "axios";

/**
 * RetrievalButton Component
 * Allows users to enter a book, chapter, and verse number, then retrieves the corresponding Bible verse.
 */
function RetrievalButton() {
    const [book, setBook] = useState("");
    const [chapter, setChapter] = useState("");
    const [verse, setVerse] = useState("");
    const [displayText, setDisplayText] = useState("Enter a book, chapter, and verse.");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch a specific Bible verse
    const fetchVerse = async () => {
        if (!book || !chapter || !verse) {
            setError("Please enter a valid book name, chapter, and verse.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Format the passage query as "Book Chapter:Verse"
            const passage = (`${book} ${chapter}:${verse}`);
            const response = await axios.get(`http://labs.bible.org/api/?passage=${passage}&formatting=plain`);
            
            if (!response.data.trim()) {
                throw new Error("No verse found. Please check your input.");
            }

            setDisplayText(response.data);
        } catch (error) {
            setError("Failed to fetch the verse. Please check your input and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h3>{displayText}</h3>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>Enter a book, chapter, and verse, then click "Retrieve".</p>
            <input
                type="text"
                placeholder="Book (e.g., John)"
                value={book}
                onChange={(e) => setBook(e.target.value)}
            />
            <input
                type="text"
                placeholder="Chapter"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
            />
            <input
                type="text"
                placeholder="Verse"
                value={verse}
                onChange={(e) => setVerse(e.target.value)}
            />
            <button onClick={fetchVerse} disabled={loading}>Retrieve</button>
        </div>
    );
}

export default RetrievalButton;

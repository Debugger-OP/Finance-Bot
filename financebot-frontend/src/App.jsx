import { useState } from "react";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    try {
      const res = await fetch("http://localhost:8000/api/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: userInput }),
      });

      const data = await res.json();
      setResponse(data.response || data.error || "No response received.");
      setShowResponse(true);
    } catch (error) {
      setResponse("Error: " + error.message);
      setShowResponse(true);
    }
  };

  const clearResponse = () => {
    setUserInput("");
    setResponse("");
    setShowResponse(false);
  };

  return (
    <>
      <div className="container">
        <h2>💬 Personal Finance Helper</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="user_input"
            placeholder="Ask me about your spending..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            required
          />
          <button type="submit">Ask</button>
        </form>

        {showResponse && (
          <>
            <div className="response">
              <p>
                <strong>Bot:</strong> {response}
              </p>
            </div>
            <button className="clear-button" onClick={clearResponse}>
              Clear Response
            </button>
          </>
        )}
      </div>

      <footer>
        <p>
          &copy; 2025 By Saurav Sharma | Made with *lots* of coffee, minimal
          sleep, and questionable decisions
        </p>
      </footer>
    </>
  );
}

export default App;

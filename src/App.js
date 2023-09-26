import React from "react";
import "./App.css";

function App() {
  const API_KEY = "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";
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const [text, setText] = React.useState("");
  const [result, setResult] = React.useState("");
  const [isgenerating, setIsGenerating] = React.useState(false);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const startStream = async () => {
    if (!text) {
      alert("Please enter some text");
      return;
    }
    setIsGenerating(true);
    setResult("Generating....");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant" },
            { role: "user", content: text },
          ],
        }),
      });
      const data = await response.json();
      setResult(data.choices[0].message.content);
      setText("");
    } catch (error) {
      setResult("Error in generating text");
    } finally {
      setIsGenerating(false);
    }
  };
  const stopStream = () => {
    setResult("");
    setIsGenerating(false);
  };

  return (
    <div className="App">
      <div className="main-div">
        <div className="secondary-div">
          <div className="main-heading">Streaming OpenAI API</div>
          <div className="result-container">
            <p className="result-heading">Generated Text</p>
            <p className="result-text">{result}</p>
          </div>
          <input
            className="result-input"
            type="text"
            value={text}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                startStream();
              }
            }}
          />
          <div className="button-container">
            <button
              className="generate-button"
              onClick={startStream}
              disabled={isgenerating}
            >
              Start
            </button>
            <button
              className="stop-button"
              onClick={stopStream}
              disabled={!isgenerating}
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

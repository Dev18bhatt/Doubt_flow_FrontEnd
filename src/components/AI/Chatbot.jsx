import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function GeminiInReact() {
    const [inputValue, setInputValue] = useState(''); // User's input
    const [promptResponses, setPromptResponses] = useState([]); // AI responses
    const [loading, setLoading] = useState(false); // Loading state

    const genAI = new GoogleGenerativeAI("AIzaSyCRcw6tD3oV29N9Be20gZYWVf_cmDCGTAc"); // Replace with your actual API key

    // Handle user input changes
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Function to get response from AI
    const getResponseForGivenPrompt = async () => {
        if (!inputValue.trim()) return; // Prevent empty input

        try {
            setLoading(true); // Set loading state to true

            // Get the generative model (adjust as needed, e.g., `gemini-pro`)
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            // Generate AI content based on the user input
            const result = await model.generateContent(inputValue);

            // Clear the input field after sending the prompt
            setInputValue('');

            // Extract the response text from the AI result
            const response = result.response;
            const text = response.text();

            // Log the response (optional)
            console.log(text);

            // Add the new AI response to the state
            setPromptResponses([...promptResponses, { text, sender: "ai" }]);

            setLoading(false); // Set loading state to false
        } catch (error) {
            console.log(error); // Log error if something goes wrong
            setLoading(false); // Set loading state to false
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-3xl font-semibold text-center mb-6">AI Chatbot</h1>

            <div className="chat-window bg-gray-100 p-4 rounded-lg h-80 overflow-y-auto mb-4 shadow-lg">
                {/* Displaying chat messages */}
                {promptResponses.map((message, index) => (
                    <div
                        key={index}
                        className={`p-2 my-2 rounded-lg ${message.sender === "ai" ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                    >
                        <p>{message.text}</p>
                    </div>
                ))}

                {/* Show a loading spinner when AI is generating response */}
                {loading && (
                    <div className="flex justify-center items-center py-4">
                        <div className="animate-spin border-4 border-t-4 border-blue-500 rounded-full w-8 h-8"></div>
                    </div>
                )}
            </div>

            <div className="input-section flex items-center space-x-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Ask something..."
                    className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={getResponseForGivenPrompt}
                    disabled={loading}
                    className="bg-blue-500 text-white p-3 rounded-lg disabled:bg-blue-300 cursor-pointer"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default GeminiInReact;

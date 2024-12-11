import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Home = () => {
    const name = localStorage.getItem("details");

    const [inputValue, setInputValue] = useState(''); // User's input for AI
    const [messages, setMessages] = useState([]); // Store chat messages
    const [loading, setLoading] = useState(false); // Loading state for AI response

    const genAI = new GoogleGenerativeAI("AIzaSyCRcw6tD3oV29N9Be20gZYWVf_cmDCGTAc"); // Replace with your actual API key

    // Handle user input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Send user input to the AI and get a response
    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        // Add user's message to the chat
        setMessages([...messages, { text: inputValue, sender: "user" }]);
        setInputValue(''); // Clear input field

        setLoading(true); // Set loading state

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(inputValue);
            const aiResponse = result.response.text();

            // Add AI response to chat
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: aiResponse, sender: "ai" },
            ]);
        } catch (error) {
            console.log("Error fetching AI response:", error);
        }

        setLoading(false); // Reset loading state
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-6 bg-gray-900 shadow-lg">
                <div className="text-2xl font-extrabold text-white">ASK_FLOW_APP</div>
                <ul className="flex space-x-6 text-lg font-semibold">
                    <li>
                        <Link to="/profilepage" className="hover:text-blue-300 transition duration-300">Profile</Link>
                    </li>
                    <li>
                        <Link to="/login">
                            <button
                                onClick={() => {
                                    localStorage.setItem("token", "");
                                    navigator('/login');
                                }}
                                className="hover:text-red-400 transition duration-300"
                            >
                                Logout
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Welcome Section */}
            <header className="text-center py-16">
                <h1 className="text-4xl font-extrabold mb-2 text-white">Welcome, {name}</h1>
                <p className="mt-4 text-xl text-gray-300">
                    Explore the features and make the most out of your experience.
                </p>
            </header>
            <section className="p-8">
                <div className="p-8 bg-gray-800 rounded-xl shadow-2xl transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out">
                    <h2 className="text-2xl font-bold text-white mb-4">AI Chatbot</h2>
                    <div className="bg-gray-700 p-4 rounded-lg h-64 overflow-y-scroll mb-4 smooth-scroll">
                        {/* Display messages */}
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-3`}
                            >
                                <div
                                    className={`p-3 ${message.sender === "user"
                                            ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                                            : "bg-gradient-to-r from-gray-500 to-gray-700 text-white"
                                        } rounded-lg max-w-xs shadow-lg`}
                                >
                                    {message.sender === "ai" ? (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                                    ) : (
                                        <p>{message.text}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {/* Loading indicator */}
                        {loading && (
                            <div className="text-center">
                                <div className="animate-pulse text-gray-300">Typing...</div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="w-full p-3 rounded-lg text-black border-2 border-gray-600 focus:outline-none focus:border-blue-500"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Ask me anything..."
                        />
                        <button
                            onClick={handleSendMessage}
                            className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg disabled:opacity-50 transition duration-300"
                            disabled={loading}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </section>


            {/* Cards Section */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-8 py-8">
                {/* View Questions Card */}
                <div className="p-8 bg-gray-800 rounded-xl shadow-2xl transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out">
                    <h2 className="text-2xl font-bold text-white">View Questions</h2>
                    <p className="mt-2 text-gray-400">
                        Read the Question and help the community with your insights.
                    </p>
                    <div className="mt-6 text-center">
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition duration-300">
                            <Link to="/questionPage">Go To Question</Link>
                        </button>
                    </div>
                </div>

                {/* Post Your Question Card */}
                <div className="p-8 bg-gray-800 rounded-xl shadow-2xl transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out">
                    <h2 className="text-2xl font-bold text-white">Post Your Question or Queries</h2>
                    <p className="mt-2 text-gray-400">
                        Have a question or a query? Post it here and get answers from the community.
                    </p>
                    <div className="mt-6 text-center">
                        <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transition duration-300">
                            <Link to="/postQuestionPage">Post Question</Link>
                        </button>
                    </div>
                </div>

                {/* Post Your Blogs Card */}
                <div className="p-8 bg-gray-800 rounded-xl shadow-2xl transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out">
                    <h2 className="text-2xl font-bold text-white">Post Your Blogs or Thoughts</h2>
                    <p className="mt-2 text-gray-400">
                        Stay ahead with the latest trends. Discover practical tips for everyday challenges. Get inspired by stories.
                    </p>
                    <div className="mt-6 text-center">
                        <button className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition duration-300">
                            <Link to="/getBlog">Post Blog</Link>
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-6 text-center text-gray-400">
                <p>&copy; 2024 ASK_FLOW_APP. All Rights Reserved.</p>
            </footer>
        </div>
    );
};
export default Home;

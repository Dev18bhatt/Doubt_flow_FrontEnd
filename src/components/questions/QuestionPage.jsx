import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function QuestionPage() {
    const [questions, setQuestions] = useState([]); // Initialize as an empty array

    useEffect(() => {
        fetch('http://localhost:5000/api/askquestion/getAllQuestion', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Received data:', data);
                if (Array.isArray(data.question)) {
                    setQuestions(data.question);
                } else {
                    console.error("Unexpected data format", data);
                }
            })
            .catch((err) => {
                console.log("Error fetching data:", err);
            });
    }, []); // Empty dependency array to run the effect only once when component mounts

    // const handlePostAnswer = (questionId) => {
    //     console.log("Post answer for question ID:", questionId);
    //     // You can open a modal or redirect to an answer page
    // };

    return (
        <div className="bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 min-h-screen p-6">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Questions</h1>
            <div className="space-y-6">
                {questions.map((question) => (
                    <div
                        key={question._id} // Use unique _id as key
                        className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300"
                    >
                        {/* Flex container for title and button */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-semibold text-gray-800">{question.title}</h3>

                            <Link to={`/postAnswer/${question._id}`}>
                                <button
                                    className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
                                >
                                    Post the Answer
                                </button>
                            </Link>


                        </div>

                        <p className="text-base text-gray-700 mb-4">{question.body}</p>

                        <div className="flex flex-wrap gap-3 mb-6">
                            {question.tags && question.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="bg-indigo-100 text-indigo-700 text-xs font-semibold py-2 px-4 rounded-full shadow-sm hover:shadow-md transition-shadow"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

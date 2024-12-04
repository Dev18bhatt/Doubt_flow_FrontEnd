import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostAnswer = () => {
    const param = useParams();
    const navigate = useNavigate();

    const [questionTitle, setQuestionTitle] = useState("");
    const [existingAns, setExistingAns] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch(
                    `http://localhost:6000/api/askquestion/getspecificQuestion/${param.id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                        }
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setQuestionTitle(data.data.title);
                } else {
                    console.error("Failed to fetch question:", await response.json());
                }
            } catch (err) {
                console.error("Error fetching question:", err);
            }
        };

        const fetchAllAnswers = async () => {
            try {
                const response = await fetch(
                    `http://localhost:6000/api/answer/${param.id}/getanswer`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                        }
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setExistingAns(data.answer);
                } else {
                    console.error("Failed to fetch answers:", await response.json());
                }
            } catch (err) {
                console.error("Error fetching answers:", err);
            }
        };

        fetchQuestion();
        fetchAllAnswers();
    }, [param.id]);

    const handlePostAnswer = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`http://localhost:6000/api/answer/${param.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                },
                body: JSON.stringify({
                    answerTitle: title,
                    answerBody: body
                })
            });

            if (response.ok) {
                setTitle("");
                setBody("");
                navigate("/home");
            } else {
                console.error("Failed to post answer:", await response.json());
            }
        } catch (err) {
            console.error("Error posting answer:", err);
            alert("An error occurred while posting the answer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Question Title */}
                <div className="bg-white p-6 rounded-md shadow-md mb-8">
                    <h2 className="text-3xl font-bold text-blue-600">{questionTitle}</h2>
                </div>

                {/* Post Answer Form */}
                <div className="bg-white p-8 rounded-md shadow-md mb-12">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Post Your Answer</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handlePostAnswer();
                        }}
                        className="space-y-6"
                    >
                        <div>
                            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                                Answer Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter the title"
                                className="w-full px-4 py-3 border rounded-md focus:ring focus:ring-blue-300 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="body" className="block text-gray-700 font-medium mb-2">
                                Answer Body
                            </label>
                            <textarea
                                id="body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Write your answer here"
                                className="w-full px-4 py-3 border rounded-md focus:ring focus:ring-blue-300 outline-none h-32 resize-none"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3 rounded-md text-white font-medium transition ${isSubmitting ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
                                }`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Posting..." : "Post Answer"}
                        </button>
                    </form>
                </div>
                {/* Existing Answers Heading */}
                <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-12 text-center">
                    Existing Answers
                </h2>

                {/* Existing Answers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {existingAns.map((answer, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-300"
                        >
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">{answer.title}</h4>
                            <p className="text-gray-600 truncate mb-4">{answer.body}</p>
                            <button
                                onClick={() => {
                                    localStorage.setItem(
                                        "selectedAnswer",
                                        JSON.stringify({ title: answer.title, body: answer.body, author_name: answer.author.name, date: answer.createdAt })
                                    );
                                    navigate("/readAnswer");
                                }}
                                className="text-blue-500 font-medium hover:underline"
                            >
                                Read More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostAnswer;

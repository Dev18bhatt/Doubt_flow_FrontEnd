import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
                console.log("this is our param id", param.id);
                const response = await fetch(
                    `http://localhost:5000/api/askquestion/getspecificQuestion/${param.id}`,
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

        fetchQuestion();

        const fetchAllAnswerToSpecificQuestion = async () => {

            try {
                // http://localhost:5000/api/answer/673d8319cb3cdde796a6d150/getanswer
                const response = await fetch(
                    ` http://localhost:5000/api/answer/${param.id}/getanswer`,
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
                    console.log(data.answer);
                    setExistingAns(data.answer);
                }
                else {
                    console.error("Failed to fetch question:", await response.json());
                }
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchAllAnswerToSpecificQuestion();






    });

    const handlePostAnswer = async () => {
        setIsSubmitting(true); // Start submission
        try {
            const response = await fetch(`http://localhost:5000/api/answer/${param.id}`, {
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
                console.log(response.json());
                navigate("/home");
            } else {
                console.error("Failed to post answer:", await response.json());
            }
        } catch (err) {
            console.error("Error posting answer:", err);
            alert("An error occurred while posting the answer.");
        } finally {
            setIsSubmitting(false); // End submission
        }
    };



    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center py-12">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">{questionTitle}</h2>

                <h1 className="text-3xl font-bold text-gray-800 mb-6">Post Your Answer</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handlePostAnswer();
                    }}
                    className="space-y-6"
                >
                    <div className="mb-6">
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

                    <div className="mb-6">
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
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Posting..." : "Post Answer"}
                    </button>
                </form>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-screen-md">
                {existingAns.map((answer, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition duration-300"
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{answer.title}</h3>
                        <p className="text-gray-700 mb-4 truncate">{answer.body}</p>
                        {/* Wrap the button with Link to handle navigation */}

                        <Link to={{
                            pathname: "/readAnswer",
                            state: { title: answer.title, body: answer.body }
                        }}>
                            <button>Read More</button>
                        </Link>


                    </div>
                ))}
            </div>

        </div>
    );
};

export default PostAnswer;

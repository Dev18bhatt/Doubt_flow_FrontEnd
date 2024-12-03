import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]); // Initialize as an empty array
    const [searchQuery, setSearchQuery] = useState(''); // State for search input
    const navigate = useNavigate();

    // Filtered questions based on search query
    const filteredQuestions = blogs.filter((question) =>
        question.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        fetch('http://localhost:5000/api/blogs/getBlogs', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Received data:', data);
                if (Array.isArray(data.blogs)) {
                    setBlogs(data.blogs);
                } else {
                    console.error("Unexpected data format", data);
                }
            })
            .catch((err) => {
                console.log("Error fetching data:", err);
            });
    }, []);



    return (
        <div className="bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 min-h-screen p-6">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Blogs</h1>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    className="w-full px-4 py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            </div>

            <div className="space-y-6">
                {filteredQuestions.map((blogs) => (
                    <div
                        key={blogs._id} // Use unique _id as key
                        className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300"
                    >
                        {/* Flex container for title and button */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-semibold text-gray-800">{blogs.title}</h3>


                            <button
                                onClick={() => {
                                    localStorage.setItem(
                                        "selectedAnswer",
                                        JSON.stringify({ title: blogs.title, body: blogs.body, author_name: blogs.author.name, date: blogs.createdAt })
                                    );
                                    navigate("/readAnswer");
                                }}
                                className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
                            >
                                Read More
                            </button>

                        </div>

                        <p className="text-base text-gray-700 mb-4">{blogs.body}</p>

                        <div className="flex flex-wrap gap-3 mb-6">
                            {blogs.tags && blogs.tags.map((tag, idx) => (
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


                {filteredQuestions.length === 0 && (
                    <div className="text-center text-gray-500 text-lg">No Blogs found.</div>
                )}
            </div>
        </div>
    );
}

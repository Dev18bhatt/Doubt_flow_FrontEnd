import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const PostBlog = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const navigate = useNavigate();

    const handleTagAdd = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag("");  // Reset the tag input
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the postQuery function to send data to the API
        postBlogs({ title, body, tags });
    };

    function postBlogs(data) {
        fetch('http://localhost:5000/api/blogs/postBlogs', {
            method: "POST",
            body: JSON.stringify(data),  // Send the question data (title, body, tags)
            headers: {
                "Content-Type": "application/json",  // Set Content-Type
                "Authorization": `Bearer ${localStorage.getItem("token")}`  // Pass token for authentication
            }
        })
            .then((response) => {
                if (response.status !== 201) {
                    throw new Error("There may be some issue inside your code...");
                }
                return response.json();  // Parse the JSON response
            })
            .then((data) => {
                console.log("Question posted successfully:", data);
                navigate('/getBlog')
            })
            .catch((err) => {
                console.error("Error posting question:", err);
                // You can show an error message here
            });
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 bg-gray-800">
                <div className="text-lg font-bold">ASK_FLOW_APP</div>
                <ul className="flex space-x-4">
                    <li><a href="/home" className="hover:text-blue-400">Home</a></li>
                    <li><a href="/profile" className="hover:text-blue-400">Profile</a></li>
                    <li><button className="hover:text-red-400">Logout</button></li>
                </ul>
            </nav>

            {/* Page Title */}
            <header className="text-center py-10">
                <h1 className="text-3xl font-bold">Post Your Blogs</h1>
                <p className="mt-4 text-gray-400">Share your Thoughts and Stories which helps Community.</p>
            </header>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="space-y-6">
                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-lg font-semibold text-gray-300">
                            Blogs Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-2 w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your question title"
                            required
                        />
                    </div>

                    {/* Body Input */}
                    <div>
                        <label htmlFor="body" className="block text-lg font-semibold text-gray-300">
                            Blogs Body
                        </label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="mt-2 w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Write your thoughts in detail"
                            rows="6"
                            required
                        />
                    </div>

                    {/* Tags Input */}
                    <div>
                        <label htmlFor="tags" className="block text-lg font-semibold text-gray-300">
                            Tags (Optional)
                        </label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <input
                                id="tags"
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                className="p-2 w-full sm:w-3/4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Add tags (comma separated)"
                            />
                            <button
                                type="button"
                                onClick={handleTagAdd}
                                className="w-1/4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                            >
                                Add Tag
                            </button>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="bg-gray-600 text-white text-xs font-medium py-1 px-3 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-500 text-black rounded-lg hover:bg-green-600"
                        >
                            Post Your Blogs
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PostBlog;

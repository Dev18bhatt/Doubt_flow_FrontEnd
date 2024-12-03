import { useEffect, useState } from "react";

const ReadBlogs = () => {
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const savedAnswer = JSON.parse(localStorage.getItem("selectedAnswer"));
        if (savedAnswer) {
            setBlog(savedAnswer);
        } else {
            console.error("No data found. Redirecting...");
            // Optionally redirect or show a message
        }
    }, []);

    if (!blog) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
                        {blog.title}
                    </h1>
                    <div className="flex flex-col space-y-2">
                        <p className="text-xl font-semibold text-gray-600">
                            Author: <span className="text-gray-800">{blog.author_name}</span>
                        </p>
                        <p className="text-md text-gray-500">
                            Posted on:{" "}
                            <span className="text-gray-700">
                                {new Date(blog.date).toLocaleDateString()}
                            </span>
                        </p>
                    </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{blog.body}</p>
                <div className="mt-6 flex justify-end">
                    <button
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReadBlogs;

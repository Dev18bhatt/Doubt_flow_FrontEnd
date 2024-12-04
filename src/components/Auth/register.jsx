import { useState } from "react";

const SignUpPage = () => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(null); // State to store errors
    const [successMessage, setSuccessMessage] = useState(null); // State to store success messages

    function handleOnChange(event) {
        setUserDetails((prev) => ({
            ...prev,
            [event.target.name]: event.target.value, // Ensure `name` attribute exists in inputs
        }));
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to register");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Response data:", data);
                setSuccessMessage("Registration successful!");
                setError(null); // Clear any previous errors
                setUserDetails({
                    name: "",
                    email: "",
                    password: "",
                });
            })
            .catch((err) => {
                console.error("Error:", err);
                setError(err.message); // Set error state
                setSuccessMessage(null); // Clear success message
            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Success Message */}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                <form className="space-y-4" onSubmit={handleOnSubmit}>
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userDetails.name}
                            onChange={handleOnChange}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userDetails.email}
                            placeholder="Enter your email"
                            onChange={handleOnChange}
                            className="w-full px-4 py-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userDetails.password}
                            placeholder="Enter your password"
                            onChange={handleOnChange}
                            className="w-full px-4 py-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 font-semibold text-black bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Already Registered */}
                <p className="text-center text-sm text-gray-300 mt-4">
                    Already registered?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default SignUpPage;

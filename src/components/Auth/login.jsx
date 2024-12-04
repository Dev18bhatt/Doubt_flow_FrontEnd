import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({

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

        if (!userDetails.email || !userDetails.password) {
            setError("Please fill in all fields.");
            return;
        }
        fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Login failed: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.token) {
                    // Handle successful login
                    localStorage.setItem("token", data.token);
                    navigate('/home');
                }
            })
            .catch((err) => {
                console.error("Network error:", err);
                setError(`Error: ${err.message}`);
                setSuccessMessage(null);
            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-white">Login </h2>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Success Message */}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                <div className="space-y-4">
                    {/* Name */}


                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email" // Added name attribute
                            value={userDetails.email} // Controlled component
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
                            name="password" // Added name attribute
                            value={userDetails.password} // Controlled component
                            placeholder="Enter your password"
                            onChange={handleOnChange}
                            className="w-full px-4 py-2 mt-1 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 font-semibold text-black bg-blue-500 rounded-lg hover:bg-blue-600"
                        onClick={handleOnSubmit}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

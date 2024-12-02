import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Check if profile data is already stored in localStorage
        const storedUserData = localStorage.getItem("userProfile");

        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setLoading(false);  // Since data is already available, no need to load
        } else {
            const fetchProfile = async () => {
                try {
                    const response = await fetch(
                        "http://localhost:5000/api/profile/getUserprofile",
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }

                    const data = await response.json();
                    setUserData(data.user);
                    // Store the fetched data in localStorage
                    localStorage.setItem("userProfile", JSON.stringify(data.user));
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchProfile();
        }
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                    <img
                        src= "data:image/png;base64,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"
                        alt="Profile Avatar"
                        className="w-24 h-24 rounded-full object-cover border-4 border-green-500"
                    />
                </div>

                {/* User Info */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                    <p className="text-gray-600">{userData.email}</p>
                </div>

                {/* About and Bio */}
                <div className="space-y-4 text-left">
                    <div>
                        <h3 className="text-lg font-semibold text-green-600">About</h3>
                        <p className="text-gray-700">
                            {userData.about || "No information provided."}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-green-600">Bio</h3>
                        <p className="text-gray-700">
                            {userData.bio || "No bio available."}
                        </p>
                    </div>
                </div>

                {/* Dates */}
                <div className="mt-6 text-sm text-gray-500">
                    <p>
                        <strong>Joined:</strong>{" "}
                        {new Date(userData.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Last Updated:</strong>{" "}
                        {new Date(userData.updatedAt).toLocaleDateString()}
                    </p>
                </div>

                {/* Update Profile Button */}
                <div className="mt-6">
                    <Link to="/updateProfile">
                        <button
                            className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600 transition duration-200"
                        >
                            Update Profile
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

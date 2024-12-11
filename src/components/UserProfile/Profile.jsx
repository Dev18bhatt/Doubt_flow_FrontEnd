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
                    console.log('this  is data coming from end point ', data.user);
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

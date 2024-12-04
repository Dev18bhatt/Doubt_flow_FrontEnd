import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        about: "",
        bio: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch user profile on mount
    useEffect(() => {
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
                setUserData({
                    name: data.user.name,
                    about: data.user.about,
                    bio: data.user.bio,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    // Update user profile

    function update() {
        fetch('http://localhost:5000/api/profile/updateProfile', {
            method: "PUT", // Assuming POST is used for update
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },

        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('the data that is comming from end point is :', data);

                navigate('/profilepage', { replace: true });
            })
            .catch((err) => {
                console.log(err);
            });
    }



    // Loading state
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    // Error state
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
                <h1 className="text-2xl font-bold text-center mb-6">Update Profile</h1>

                <form>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {/* About Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">About</label>
                        <textarea
                            name="about"
                            value={userData.about}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                            rows="3"
                        />
                    </div>

                    {/* Bio Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            name="bio"
                            value={userData.bio}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                            rows="3"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={() => {
                            update();
                        }}
                        className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600 transition duration-200"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}

import { Link } from "react-router-dom";

const Home = () => {
    const name = localStorage.getItem("details");

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-6 bg-gray-900 shadow-lg">
                <div className="text-2xl font-extrabold text-white">ASK_FLOW_APP</div>
                <ul className="flex space-x-6 text-lg font-semibold">
                    <li>
                        <Link to="/profilepage" className="hover:text-blue-300 transition duration-300">Profile</Link>
                    </li>
                    <li>
                        <button className="hover:text-red-400 transition duration-300">Logout</button>
                    </li>
                </ul>
            </nav>

            {/* Welcome Section */}
            <header className="text-center py-16">
                <h1 className="text-4xl font-extrabold mb-2 text-white">
                    Welcome, {name}
                </h1>
                <p className="mt-4 text-xl text-gray-300">
                    Explore the features and make the most out of your experience.
                </p>
            </header>

            {/* Main Content */}
            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                {/* View Questions Card */}
                <div className="p-8 bg-gray-800 rounded-xl shadow-2xl transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out">
                    <h2 className="text-2xl font-bold text-white">View Questions</h2>
                    <p className="mt-2 text-gray-400">
                        Read the Question and help the community with your insights.
                    </p>
                    <div className="mt-6 text-center">
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition duration-300">
                            <Link to="/questionPage">Go To Question</Link>
                        </button>
                    </div>
                </div>

                {/* Post Your Question or Queries Card */}
                <div className="p-8 bg-gray-800 rounded-xl shadow-2xl transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out">
                    <h2 className="text-2xl font-bold text-white">Post Your Question or Queries</h2>
                    <p className="mt-2 text-gray-400">
                        Have a question or a query? Post it here and get answers from the community.
                    </p>
                    <div className="mt-6 text-center">
                        <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transition duration-300">
                            <Link to="/postQuestionPage">Post Question</Link>
                        </button>
                    </div>
                </div>

                {/* Post Your Blogs or Thoughts Card */}
                <div className="p-8 bg-gray-800 rounded-xl shadow-2xl transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out">
                    <h2 className="text-2xl font-bold text-white">Post Your Blogs or Thoughts</h2>
                    <p className="mt-2 text-gray-400">
                        Stay ahead with the latest trends. Discover practical tips for everyday challenges. Get inspired by stories.
                    </p>
                    <div className="mt-6 text-center">
                        <button className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition duration-300">
                            <Link to="/getBlog">Post Blog</Link>
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 py-6 text-center text-gray-400">
                <p>&copy; 2024 ASK_FLOW_APP. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Home;

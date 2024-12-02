import { Link } from "react-router-dom";

const Home = () => {
    const name = localStorage.getItem("details");

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 bg-gray-800">
                <div className="text-lg font-bold">ASK_FLOW_APP</div>
                <ul className="flex space-x-4">

                    <li>
                        <Link to="/profilepage" className="hover:text-blue-400">Profile</Link>
                    </li>
                    <li>
                        <button className="hover:text-red-400">Logout</button>
                    </li>
                </ul>
            </nav>

            {/* Welcome Section */}
            <header className="text-center py-10">
                <h1 className="text-3xl font-bold">
                    Welcome, {name}
                </h1>
                <p className="mt-4 text-gray-400">
                    Explore the features and make the most out of your experience.
                </p>
            </header>

            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {/* View Questions Card */}
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition">
                    <h2 className="text-xl font-semibold">View Questions</h2>
                    <p className="mt-2 text-gray-400">
                        Read the Question and try to help the community out there....
                    </p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600">
                        <Link to="/questionPage">Go To Question</Link>
                    </button>
                </div>

                {/* Post Your Question or Queries Card */}
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition">
                    <h2 className="text-xl font-semibold">Post Your Question or Queries</h2>
                    <p className="mt-2 text-gray-400">
                        Have a question or a query? Post it here and get help from the community.
                    </p>
                    <button className="mt-4 px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600">
                        <Link to="/postQuestionPage">Post Question</Link>
                    </button>
                </div>

            </main>
        </div>
    );
};

export default Home;


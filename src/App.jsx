import { useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./components/Auth/register";
import LoginPage from "./components/Auth/login";
import Home from "./components/questions/Home";
import PrivateRoute from "./components/middle/Private";
import QuestionPage from "./components/questions/QuestionPage";
import PostQuestion from "./components/questions/PostQuestion";
import Profile from "./components/UserProfile/profile";
import UpdateProfile from "./components/UserProfile/UpdateProfile";
import PostAnswer from "./components/AddAnswer/post_answer";
import ReadAnswer from "./components/AddAnswer/ReadAnswer";
import PostBlog from "./components/Blogs/PostBlog";
import BlogsPage from "./components/Blogs/GetBlogs";
import ReadBlogs from "./components/Blogs/ReadBlogs";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<PrivateRoute Component={Home} />} />
        <Route path="/questionPage" element={<PrivateRoute Component={QuestionPage} />} />
        <Route path="/postquestionpage" element={<PrivateRoute Component={PostQuestion} />} />
        <Route path="/profilepage" element={<PrivateRoute Component={Profile} />} />
        <Route path="/updateProfile" element={<PrivateRoute Component={UpdateProfile} />} />
        <Route path="/postAnswer/:id" element={<PrivateRoute Component={PostAnswer} />} />
        <Route path="/readAnswer" element={<PrivateRoute Component={ReadAnswer} />} />
        <Route path="/postBlog" element={<PrivateRoute Component={PostBlog} />} />
        <Route path="/getBlog" element={<PrivateRoute Component={BlogsPage} />} />
        <Route path='/readBlogs' element={<PrivateRoute Component={ReadBlogs} />} />
      </Routes>
    </>
  );
}

export default App;

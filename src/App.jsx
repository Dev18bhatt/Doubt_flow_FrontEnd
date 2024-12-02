import SignUpPage from "./components/Auth/register"
import LoginPage from "./components/Auth/login"
import { Routes, Route } from "react-router-dom"
import Home from "./components/questions/Home"
import PrivateRoute from "./components/middle/Private"
import QuestionPage from "./components/questions/QuestionPage"
import PostQuestion from "./components/questions/PostQuestion"
import Profile from "./components/UserProfile/profile"
import UpdateProfile from "./components/UserProfile/UpdateProfile"
import PostAnswer from "./components/AddAnswer/post_answer"
import ReadAnswer from "./components/AddAnswer/ReadAnswer"
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignUpPage />} />
        <Route path='/register' element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<PrivateRoute Component={Home} />} />
        <Route path="/questionPage" element={<PrivateRoute Component={QuestionPage} />} />
        <Route path="/postquestionpage" element={<PrivateRoute Component={PostQuestion} />} />
        <Route path="/profilepage" element={<PrivateRoute Component={Profile} />} />
        <Route path="/updateProfile" element={<PrivateRoute Component={UpdateProfile} />} />
        <Route path="/postAnswer/:id" element={<PrivateRoute Component={PostAnswer} />} />
        <Route path="/readAnswer" element={<ReadAnswer />} />

      </Routes>


    </>
  )
}

export default App

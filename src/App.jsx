import SignUpPage from "./components/Auth/register"
import LoginPage from "./components/Auth/login"
import { Routes, Route } from "react-router-dom"
import Home from "./components/questions/Home"
import PrivateRoute from "./components/middle/Private"
import QuestionPage from "./components/questions/QuestionPage"
import PostQuestion from "./components/questions/PostQuestion"


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
        <Route />


      </Routes>


    </>
  )
}

export default App

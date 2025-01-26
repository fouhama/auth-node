import Floatingshape from "./components/floatingshape"
import {Routes, Route} from "react-router-dom"
import SignupPage from "./Pages/SignupPage"
import LoginPage from "./Pages/LoginPage"
import EmailVerificationPage from "./Pages/EmailVerificationPage"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden ">
      <Floatingshape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <Floatingshape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <Floatingshape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <Routes>
        <Route path="/" element={"Home"} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/verify-email" element={<EmailVerificationPage />} />
      </Routes>

    </div>
  )
}

export default App

import Floatingshape from "./components/floatingshape.jsx"
import {Routes, Route, Navigate} from "react-router-dom"
import SignupPage from "./Pages/SignupPage"
import LoginPage from "./Pages/LoginPage"
import EmailVerificationPage from "./Pages/EmailVerificationPage"
import {Toaster} from "react-hot-toast"
import { useAuthStore } from "../store/authSore"
import { useEffect } from "react"
import Home from "./Pages/Home"
import LoadingSpinner from "./components/LoadingSpinner"
import ForgotPasswordPage from "./Pages/ForgetPasswordPage"
import ResetPasswordPage from "./Pages/ResetPasswordPage"


function App() {
 
  const RedirectAuthenticatedUser = ({ children }) => {
      const {isAuthenticated, user} = useAuthStore()
    if (isAuthenticated && user.isVerified) return <Navigate to='/' replace />
    return children
  }
  const ProtectedRoute = ({children}) => {
    const { isAuthenticated, user } = useAuthStore()
    if (!isAuthenticated) return <Navigate to="/login" replace />
    if (!user.isVerified) return <Navigate to="/verify-email" replace />
    return children
  }


  const { checkAuth, isCheckingAuth, isAuthenticated } = useAuthStore()
  useEffect( () => {
    checkAuth()
  }, [checkAuth, isAuthenticated])
  
  if(isCheckingAuth) return <LoadingSpinner/>

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden ">
      <Floatingshape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <Floatingshape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <Floatingshape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/> </ProtectedRoute>} />
        <Route path="/signup" element={<RedirectAuthenticatedUser><SignupPage /></RedirectAuthenticatedUser>} />
        <Route path="/login" element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} /> 
        <Route path="/verify-email" element={<RedirectAuthenticatedUser><EmailVerificationPage /></RedirectAuthenticatedUser>} />
        <Route path="/forgot-password" element={<RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>} />
        <Route path="/reset-password/:code" element={<RedirectAuthenticatedUser><ResetPasswordPage/> </RedirectAuthenticatedUser>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App

import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import Input from "../components/Input";
import { LockKeyhole, Loader } from "lucide-react";
import { useAuthStore } from "../../store/authSore";
import { useState } from "react";

const ResetPasswordPage = () => {
    const {code} = useParams();
    const { error, isLoading, resetPass, message } = useAuthStore()
    const [pass, setPass] = useState('')
    const [errorConfPass, setErrorConfPass] = useState('')
    const [confPass, setConfPass] = useState('')
    const navigate = useNavigate()
     const handlePass = () => {
         if (pass !== confPass)return setErrorConfPass('Password not match')
         else if (pass.length < 6) return setErrorConfPass('Password must be at least 6 characters')
         else setErrorConfPass('')
         
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        if (!errorConfPass) {
            
            await resetPass(code, pass)
         
            
            setTimeout(() => {
                navigate('/login')
             }, 5000)

           
        }

    }


    return (
        <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Reset Password
                </h2>
                {!message ? (<form onSubmit={handleSubmit}>

                    <Input
                        icon={LockKeyhole}
                        type='password'
                        placeholder='password'
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                    />
                    <Input
                        icon={LockKeyhole}
                        type='password'
                        placeholder='password confirm'
                        value={confPass}
                        onChange={(e) => setConfPass(e.target.value)}
                        onKeyUp={handlePass}
                        required
                    />
                    {errorConfPass && <p className="text-red-500 font-semibold text-sm  mb-3">{errorConfPass}</p>}
                    {error && <p className="text-red-500 font-semibold text-sm mt-[-15px] mb-3">{error}</p>}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        type='submit'
                        disabled={isLoading || errorConfPass}
                    >
                        {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
                    </motion.button>
                </form>) : <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }} className="text-green-500 font-bold text-center   mb-3">{message}</motion.p>}


            </div>


        </motion.div>
    )
}

export default ResetPasswordPage
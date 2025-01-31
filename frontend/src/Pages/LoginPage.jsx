import {motion} from 'framer-motion'
import { useState } from 'react'
import Input from '../components/Input'
import { LoaderIcon, LockKeyhole, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from "../../store/authSore.js"
const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { error, isLoading, login } = useAuthStore();

  const handleLogin = async(e) => {
    e.preventDefault()
    await login(email, password)
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1 ,y: 0 }}
      transition={{duration: 0.5}}
      className='max-w-md w-full  bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl overflow-hidden shadow-xl rounded-2xl'>

      <div className="p-8">
        <h2 className="mb-6 text-center font-bold text-3xl bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text ">
          Welcome back
        </h2>
        <form onSubmit={handleLogin}>
          <Input type='text' icon={Mail} placeholder="Email Address"  value={email}  onChange={e => setEmail(e.target.value)} />
          <Input type='password' icon={LockKeyhole} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <div className='flex items-center mb-6'>
            <Link to='/forgot-password' className='text-sm text-green-400 hover:underline'>
              Forgot password?
            </Link>
          </div>
          {error && <span className='text-red-500 font-semibold text-sm mb-2'>{ error }</span>}
          <motion.button className="w-full mt-5 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg
                    hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <LoaderIcon className='size-6 animate-spin mx-auto' /> : 'Login' }
          </motion.button>

        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Don't have an account?
          <Link to='/signup' className='ml-1 text-green-400 hover:underline'>
            Sign up
          </Link>
        </p>
      </div>

    </motion.div>
  )
}

export default LoginPage
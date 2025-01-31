import { useState  ,useRef, useEffect } from "react"
import {motion } from "framer-motion"
import { useAuthStore } from "../../store/authSore.js"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"


const EmailVerificationPage = () => {

  const { verifyEmail, isLoading, error } = useAuthStore();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const handleOnChange = (index, value) => {
    const newCode = [...code]
    if (value.length > 1) {
      const pasedCode = value.slice(0,6).split('')
      for (let i = 0; i < 6; i++) {
       newCode[i] = pasedCode[i] || ''
      }
      setCode(newCode)
      const lastIndex = pasedCode.findLastIndex(digit => digit !== "")
      const focusIndex = lastIndex < 5 ? lastIndex + 1 : 5
      inputRefs.current[focusIndex].focus()
    
      
    } else {
      newCode[index] = value
      setCode(newCode)
      if (value && index < 5) {
        inputRefs.current[index + 1].focus()
      }
  
    }
    
   
  }
  const handleOnkeyDown = (index, e) => {
    if (e.key === "Backspace"  && !code[index]  && index > 0 ) {
      inputRefs.current[index - 1 ].focus()
      
    }    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const codeVerifecation = code.join('');
      await verifyEmail(codeVerifecation);
      navigate('/')
      toast.success('Welcome to the Home Page')
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event('submit'))
    }
  },[code])
  return (
    <div className='max-w-md w-full  bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl overflow-hidden shadow-xl rounded-2xl'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{duration:0.5}}
        className="max-w-md w-full p-8 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl">
        <h2 className="text-3xl mb-6 text-center font-bold  bg-gradient-to-r from-green-400 to-emerald-500   text-transparent  bg-clip-text">
          Verify Your Email
        </h2>
        <p className="mb-6 text-gray-300 text-center ">Enter the 6-digit code sent to your email address.</p>
        <form className="space-y-6" onSubmit={handleSubmit} >
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input key={index} type="text" maxLength={6} value={digit} ref={el => inputRefs.current[index] = el} onChange={e => handleOnChange(index, e.target.value)} onKeyDown={e => handleOnkeyDown(index, e)}
                className="size-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none" />
            ))}
          </div>
          {error && <span className="text-sm font-semibold text-red-500 mt-2 ">{ error}</span>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || code.some(digit => !digit) }
            className="w-full mt-5 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg
                    hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          >
            {isLoading ? 'Verify...' : 'Verify Email' }
          </motion.button>
        </form>
        

      </motion.div>
    
    </div>
  )
}

export default EmailVerificationPage
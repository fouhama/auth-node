import { create } from "zustand"
import axios from "axios"

const URL_BACKEND =  import.meta.env.MODE === "development" ?   'http://localhost:5000' : ""
axios.defaults.withCredentials=true
export const useAuthStore = create((set) => ({
    user: null,
    error: null,
    message: null,
    isLoading: false,
    isAuthenticated: false,
    isCheckingAuth: true,
    sended: false,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${URL_BACKEND}/api/auth/signup`, { email, password, name })
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ error: error.response.data.message || "Error sign up", isLoading: false })
            throw error
        }
    },
    login: async (email, password) => {
        set({ error: null, isLoading: true })
        try {
            const respose = await axios.post(`${URL_BACKEND}/api/auth/signin`, { email, password })
            set({ user: respose.data.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message })
            throw error
        }
    },
    logout: async () => {
        set({ error: null, isLoading: true })
        try {
            await axios.post(`${URL_BACKEND}/api/auth/logout`)
            set({isLoading:false, isAuthenticated: false, user:null})
        } catch (error) {
            set({ error: error.response.data.message })
            throw error
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${URL_BACKEND}/api/auth/verification-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false, });
            return response.data
        } catch (error) {
            set({ error: error.response.data.message || 'Error Verification Email', isLoading: false });
            throw error
        }
    },
    forgotPassword: async (email) => {
        set({error:null, isLoading:true})
        try {
           const response =  await  axios.post(`${URL_BACKEND}/api/auth/forget-password`, { email })
            set({isLoading: false, message : response.data.message, sended: true})

        } catch (error) {
            set({ isLoading: false, error: error.response.data.message || "Error send Email " })
            throw error
        }
    },
    resetPass: async (code, password) => {
        set({ error: null, isLoading: true })
        try {
            const response = await axios.post(`${URL_BACKEND}/api/auth/reset-password/${code}`, {password})
            set({ isLoading: false, message: response.data.message })
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message || "Error reset password" })
            throw error
        }
    } ,
    checkAuth: async () => {
        set({isCheckingAuth: true, error:null , sended: false})
        try {
            const respose = await axios.get(`${URL_BACKEND}/api/auth/check-auth`)
            set({ user: respose.data.user, isAuthenticated:true, isCheckingAuth:false})

        } catch (error) {
            set({ error: null, isAuthenticated: false, isCheckingAuth: false })
            throw error
        }
    }


}))
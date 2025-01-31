import { create } from "zustand"
import axios from "axios"

const URL_BACKEND ='http://localhost:5000'
axios.defaults.withCredentials=true
export const useAuthStore = create((set) => ({
    user: null,
    error: null,
    isLoading: false,
    isAuthenticated: false,
    isCheckingAuth: true,

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
            set({isLoading:false, isAuthenticated: false})
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

    checkAuth: async () => {
        set({isCheckingAuth: true, error:null })
        try {
            const respose = await axios.get(`${URL_BACKEND}/api/auth/check-auth`)
            set({ user: respose.data.user, isAuthenticated:true, isCheckingAuth:false})

        } catch (error) {
            set({ error: null, isAuthenticated: false, isCheckingAuth: false })
            throw error
        }
    }

}))
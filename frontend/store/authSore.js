import { create } from "zustand"
import axios from "axios"

const URL_BACKEND ='http://localhost:5000'

export const useAuthStore = create((set) => ({
    user: null,
    error:null,
    isloading: false,
    isAuthenticated: false,
    isCheckingAuth: true,
    
    signup: async (email,password, name) => {
        set({ isloading: true, error: null })
        try {
            const response = await axios.post(`${URL_BACKEND}/api/auth/signup`, { email, password, name })
            set({ user: response.data.user, isAuthenticated: true, isloading: false })
        } catch (error) {
            set({ error: error.response.data.message || "Error sign up", isloading: false })
            throw error  
        }
    }
}))
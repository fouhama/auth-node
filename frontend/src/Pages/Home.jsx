import { HomeIcon } from "lucide-react"
import { useAuthStore } from "../../store/authSore"

const Home = () => {
  const { logout } = useAuthStore()
  const handleLogout = async () => {
    await logout()
  }
  return (
    <div className="flex flex-col gap-3">
      <HomeIcon className="size-24" /> 
      <button onClick={ handleLogout } className="px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-xl rounded-xl">Logout</button>
    </div>
  )
}

export default Home
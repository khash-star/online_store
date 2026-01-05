import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"
import { AuthProvider } from "@/contexts/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Pages />
      <Toaster />
      <SonnerToaster position="top-center" richColors />
    </AuthProvider>
  )
}

export default App 
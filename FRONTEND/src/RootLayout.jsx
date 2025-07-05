
import { Outlet } from '@tanstack/react-router'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
  <Navbar />

  <main className="flex-grow px-4 py-6 sm:px-6 md:px-8">
    <Outlet />
  </main>

  <Footer />
</div>

  )
}

export default RootLayout
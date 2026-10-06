import { useEffect, useState } from 'react'
import { getProfile } from '../services/authServices.js';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
      const loadProfile = async () => {
        try {
          const profile = await getProfile();
          setUser(profile.user);
        } catch (error) {
          console.error("Dashboard error:", error);
        }
      };
      loadProfile();
    }, []);
  return (
    <div>
      <nav className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            NOVA
          </h1>
          <div className="text-sm text-slate-400">
            {user ? `Welcome, ${user.name}` : "Loading..."}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
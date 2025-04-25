import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth, useLogout } from "@/auth/firebase.auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navigation() {
  // const [generationCount, setGenerationCount] = useState<number>(1);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth();
  const { logoutUser } = useLogout();

  // On mount, retrieve generation count from localStorage if available
  // useEffect(() => {
  //   const storedCount = localStorage.getItem("generationCount");
  //   if (storedCount) {
  //     setGenerationCount(Number(storedCount));
  //   }
  // }, []); // This will only run once when the component mounts

  // Update localStorage whenever generationCount changes
  // useEffect(() => {
  //   localStorage.setItem("generationCount", generationCount.toString());
  // }, [generationCount]); // Update localStorage whenever count changes

  return (
    <header className="w-full px-7 py-5 bg-white shadow-md z-10">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-500">
          SnapTune
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="sm:hidden"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links - Desktop */}
        <nav className="hidden sm:flex gap-6 items-center">
          <Link to="/" className="text-sm font-medium">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium">
            About
          </Link>
          <Link to="/pricing" className="text-sm font-medium">
            Pricing
          </Link>
        </nav>

        {/* Right side - Avatar and Tokens */}
        <div className="hidden sm:flex items-center gap-6">
          {/* <div className="text-sm font-medium">
            <span className="text-gray-700">Generations: </span>
            <span className="text-blue-500">{generationCount}</span>
          </div> */}
          <div className="relative">
            <div
              className="flex items-center cursor-pointer gap-2"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <Avatar>
                <AvatarImage
                  src={user?.photoURL || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border z-50">
                <ul className="p-2">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile#history"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      History
                    </Link>
                  </li>
                  <li
                    className="block px-4 py-2 text-red-700 hover:bg-gray-100"
                    onClick={() => {
                      setDropdownOpen(false);
                      logoutUser();
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <nav className="flex flex-col sm:hidden mt-4 gap-3">
            <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
              Profile
            </Link>
            <Link
              to="/profile#history"
              onClick={() => setMobileMenuOpen(false)}
            >
              History
            </Link>

            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </Link>

            <p
              className="text-red-700"
              onClick={() => {
                setMobileMenuOpen(false);
                logoutUser();
              }}
            >
              Logout
            </p>
          </nav>
        </>
      )}
    </header>
  );
}

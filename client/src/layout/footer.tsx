import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bottom-0 left-0 right-0 bg-white rounded-3xl border-gray-200 py-6 px-4 mt-5">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Logo or name */}
        <div className="text-xl font-semibold text-blue-500">SnapTune</div>

        {/* Center: Navigation links */}
        {/* <ul className="flex flex-wrap gap-6 text-gray-600 font-medium text-sm">
          <li>
            <a href="#home" className="hover:text-black transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-black transition-colors">
              Pricing
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-black transition-colors">
              About
            </a>
          </li>
        </ul> */}

        <p className="text-gray-500 text-sm text-center">
          © 2025 CapSum. All rights reserved.
        </p>

        {/* Right: Social icons */}
        <div className="flex gap-4 text-gray-500">
          <a
            href="https://github.com/Jashwanth0725"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <FaGithub size={20} />
          </a>
          {/* <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <FaTwitter size={20} />
          </a> */}
          <a
            href="https://www.linkedin.com/in/jashwanth-sai-tandamalla-0725js"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

// pages/404.js
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-gray-200">
      <div className="text-center px-4 py-8">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl text-purple-500 font-semibold mb-4">
          Oops! Page not found ( Error 404 )
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-400 mb-6">
          We can't seem to find the page you're looking for.
        </p>

        {/* Home Button */}
        <Link href="/">
          <a className="text-lg bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full transition-all transform hover:scale-105">
            Go back to Home
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

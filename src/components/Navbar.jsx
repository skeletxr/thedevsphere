import { Menu, X } from "lucide-react";
import { useContext, useState } from "react";
// import logo from "../assets/logo.png";
import { navItems } from "../constants";
import {logout} from "../constants/logic"
import { GlobalContext } from "../context/GlobalContext";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

const Navbar = ({
  setShowAuth,
  showAuth,
  scrollToPrice,
  scrollToRequestCallBack,
}) => {
  const params = useLocation();
  console.log(params);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { isAuthorized } = useContext(GlobalContext);
  const navigate = useNavigate();
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
        <div className="container px-4 mx-auto relative lg:text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-shrink-0">
              <span className="text-xl tracking-tight">The Dev Sphere</span>
            </div>
            <ul className="hidden lg:flex ml-14 space-x-12">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-purple-500 cursor-pointer"
                  onClick={() => {
                    if (item.label === "Internship Program") {
                      scrollToPrice.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    } else if (item.label === "Contact Us") {
                      scrollToRequestCallBack.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
            <div className="hidden lg:flex justify-center space-x-12 items-center">
              {!isAuthorized ? (
                <>
                  <a
                    onClick={() =>
                      showAuth ? setShowAuth("") : setShowAuth("Login")
                    }
                    className="py-2 px-3 border rounded-md"
                  >
                    Log In
                  </a>
                  <a
                    onClick={() =>
                      showAuth ? setShowAuth("") : setShowAuth("Signup")
                    }
                    className="bg-gradient-to-r from-purple-500 to-purple-800 py-2 px-3 text-white rounded-md"
                  >
                    Create an account
                  </a>
                </>
              ) : params.pathname === "/Refer" ? (
                <>
                  <NavLink to="/" className="py-2 px-3 border rounded-md">
                    Home
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/Refer" className="py-2 px-3 border rounded-md">
                    Referrals
                  </NavLink>
                </>
              )}

              {params.pathname !== "/Refer" && isAuthorized && (
                <button  onClick={() => {
                  logout();
                  setShowAuth(false);
                  window.location.reload();
                  navigate("/");
                }} className="py-2 px-3 border rounded-md">
                  LogOut
                </button>
              )}
            </div>
            <div className="lg:hidden md:flex flex-col justify-end">
              <button onClick={toggleNavbar}>
                {mobileDrawerOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
          {mobileDrawerOpen && (
            <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
              <ul>
                {navItems.map((item, index) => (
                  <li key={index} className="py-4">
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
              <div className="flex space-x-6">
                <a
                  className="py-2 px-3 border rounded-md"
                  onClick={() =>
                    showAuth ? setShowAuth("") : setShowAuth("Login")
                  }
                >
                  Sign In
                </a>
                <a
                  onClick={() =>
                    showAuth ? setShowAuth("") : setShowAuth("Login")
                  }
                  className="py-2 px-3 rounded-md bg-gradient-to-r from-purple-500 to-purple-800"
                >
                  Create an account
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

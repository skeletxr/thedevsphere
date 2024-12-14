"use client";

import { Menu, X } from "lucide-react";
import { useContext, useState, useEffect } from "react";
// import { useRouter } from "next/router";
import { logout } from "@/constants/logic";
import { GlobalContext } from "@/context/GlobalContext";
import { navItems } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

const Navbar = ({
 
  scrollToPrice,
  scrollToRequestCallBack,
  scrollToTestimonials,
  scrollToFeatures
}) => {
  const router = useRouter();
const path = usePathname();
 
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { isAuthorized, showAuth, setShowAuth } = useContext(GlobalContext);
 console.log(showAuth)
  
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
           {
            path == "/" && (
              <ul className="hidden lg:flex ml-14 space-x-12 cursor-pointer">
              {navItems.map((item, index) => (
           
                <li
                  key={index}
                  className="hover:text-purple-500 cursor-pointer"
                  onClick={() => {
                    if (path !== "/") {
                      router.push("/");
                    } else if (item.label === "Internship Program") {
                      scrollToPrice.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    } else if (item.label === "Contact Us") {
                      scrollToRequestCallBack.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    } else if (item.label === "Testimonials") {
                      scrollToTestimonials.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    }else if (item.label === "Features") {
                      scrollToFeatures.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }}
                >
          {console.log(path)}

               {item.label}
                </li>
              ))}
            </ul>
            )
           }
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
              ) : path === "/Refer" ? (
                <>
                  <a
                    onClick={() => router.push("/")}
                    className="py-2 px-3 border rounded-md"
                  >
                    Home
                  </a>
                </>
              ) : (
                <>
                  <a
                    onClick={() => router.push("/Refer")}
                    className="py-2 px-3 border rounded-md"
                  >
                    Referrals
                  </a>
                </>
              )}

              {path !== "/Refer" && isAuthorized && (
                <button
                  onClick={() => {
                    logout();
                    setShowAuth(false);
                    window.location.reload();
                    router.push("/");
                  }}
                  className="py-2 px-3 border rounded-md"
                >
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
                    showAuth ? setShowAuth("") : setShowAuth("Signup")
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

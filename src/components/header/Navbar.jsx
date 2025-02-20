import React, { useState } from "react";
import DangerBtn from "../btn/DangerBtn";
import PrimaryBtn from "../btn/PrimaryBtn";
import NavbarBtn from "./NavbarBtn.jsx";
import { Menu, X } from "lucide-react";
import { useNavigate, NavLink, useLocation } from "react-router";
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import useAuthStore from "../../hooks/useAuthStore.js";
import { IoIosArrowRoundForward } from "react-icons/io";
import logo from "../../assets/travel-planner-logo.svg";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, username, resetAuth } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      style={{ backgroundColor: !isHomePage ? "#cbd5e1" : "transparent" }}
      className="fixed w-screen text-white z-[10000]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex flex-col items-sttart space-x-3 rtl:space-x-reverse">
          <div className="flex gap-x-2">
            <img src={logo} className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap drop-shadow-[0_0_1px_rgba(0,0,0,1)] tracking-wider">
              Travel Planner
            </span>
          </div>
          {isAuthenticated && (
            <p className="text-white drop-shadow-[0_0_1px_rgba(0,0,0,1)] tracking-wider">
              Logged in as {username}
            </p>
          )}
        </NavLink>

        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col gap-4 font-medium p-4 md:p-0 mt-4 border-0 items-center md:flex-row md:mt-0 ">
            <li>
              <NavbarBtn btnText={"Trips"} onClick={() => navigate("/trips")} />
            </li>
            <li>
              <NavbarBtn btnText={"FAQ"} onClick={() => navigate("/faq")} />
            </li>
            <li>
              <NavbarBtn btnText={"About"} onClick={() => navigate("/about")} />
            </li>
            <li>
              {isAuthenticated ? (
                <DangerBtn
                  btnText={"Sign Out"}
                  onClick={() => resetAuth()}
                  icon={<HiArrowLeftEndOnRectangle size={19} />}
                />
              ) : (
                <PrimaryBtn
                  btnText={"Sign In"}
                  onClick={() => navigate("/sign-in")}
                  icon={<IoIosArrowRoundForward size={24} />}
                />
              )}
            </li>
          </ul>
        </div>
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-700 hover:text-gray-900 z-[100]"
          aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div
          className={`
          fixed top-0 right-0 h-full w-64 transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
          md:hidden z-20 bg-slate-300
        `}>
          <div className="flex justify-end p-4"></div>
          <ul className="flex flex-col p-4 h-max">
            <li className="mb-4">
              <NavbarBtn
                btnText={"Trips"}
                onClick={() => {
                  navigate("/trips");
                  setIsMenuOpen(false);
                }}
              />
            </li>
            <li className="mb-4">
              <NavbarBtn
                btnText={"FAQ"}
                onClick={() => {
                  navigate("/faq");
                  setIsMenuOpen(false);
                }}
              />
            </li>
            <li className="mb-4">
              <NavbarBtn
                btnText={"About"}
                onClick={() => {
                  navigate("/about");
                  setIsMenuOpen(false);
                }}
              />
            </li>
            <li className="mb-0">
              {isAuthenticated ? (
                <DangerBtn
                  btnText={"Sign Out"}
                  onClick={resetAuth}
                  icon={<HiArrowLeftEndOnRectangle size={19} />}
                />
              ) : (
                <PrimaryBtn
                  btnText={"Sign In"}
                  onClick={() => navigate("/sign-in")}
                  icon={<IoIosArrowRoundForward size={24} />}
                />
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default React.memo(Navbar);

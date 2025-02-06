import React from 'react'
import DangerBtn from '../btn/DangerBtn';
import PrimaryBtn from '../btn/PrimaryBtn'
import NavbarBtn from './NavbarBtn.jsx';
import { useNavigate,NavLink } from 'react-router';
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";
// about trips home
//kolla om man är inloggad. Är man inte inloggad så ska man tas till landingpage där sign in och och sign up
//är du inloggad så ska det finnas en sign out
//url/trips/add-trip

export default function Navbar() {
  const navigate = useNavigate();
  return(

<nav className="fixed w-screen bg-transparent" >
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="Lägg in nån logo" className="h-8" alt="Chas Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Chas</span>
    </NavLink>
    
    <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border-0 items-center  md:flex-row md:mt-0 bg-gray-600 bg-opacity-10">
        <li >
        <NavbarBtn btnText={"Home"} onClick={() => navigate("/")}></NavbarBtn>
        </li>

        <li>
          <NavbarBtn btnText={"Trips"} onClick={() => navigate("/trips")}></NavbarBtn>
        </li>
        <li>
          <NavbarBtn btnText={"FAQ"} onClick={() => navigate("/faq")}></NavbarBtn>
        </li>
        <li>
        <NavbarBtn btnText={"About"} onClick={() => navigate("/about")}></NavbarBtn>
        </li>
        <li>
          {/* if signed in */}
          <DangerBtn btnText={"Sign Out"} icon={<HiArrowLeftEndOnRectangle size={19}/>}></DangerBtn>
          {/* if not signed in */}
          {/* <PrimaryBtn btnText={"Sing In"}></PrimaryBtn> */}
        </li>
      </ul>
      
    </div>
    
  </div>

</nav>


)
}

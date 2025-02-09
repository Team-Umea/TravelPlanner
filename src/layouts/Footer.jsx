import { useNavigate, NavLink } from "react-router";

const links = ["Home", "Trips", "FAQ", "About"];
const currentYear = new Date().getFullYear();

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="px-8 py-10 items-center bg-slate-200">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-8 pb-8">
          {links.map((link, index) => (
            <ul key={index}>
              <li>
                <NavLink to={"/" + link.replace("Home", "")} className="font-medium">
                  {link}
                </NavLink>
              </li>
            </ul>
          ))}
        </div>
        <p className="text-gray-400">@Team Umeå </p>
        <p className="text-gray-400">&copy; {currentYear}</p>
      </div>
    </footer>
  );
}

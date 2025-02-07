
import { useNavigate,NavLink } from 'react-router';

const links = ["Home", "Trips", "FAQ", "About"];
const currentYear = new Date().getFullYear();

export default function Footer(){
  const navigate = useNavigate();
  return (
    <footer className="px-8 py-10 bg-gradient-to-b from-gray-900 to-cyan-700">
    <div className="container mx-auto flex flex-col items-center">
      <div className="flex flex-wrap items-center justify-center gap-8 pb-8">
        {links.map((link, index) => (
          
          <ul key={index}>
            <li>
              <NavLink to={"/"+ link} className="font-medium !text-white transition-colors hover:!text-gray-500">
              {link}
              </NavLink>
            </li>
          </ul>
        ))}
      </div>
      
    </div>
  </footer>
  );
}
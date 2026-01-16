import { NavLink } from 'react-router-dom';
import logo from '/scu_hor_pos_rgb_2c.png';
import { componentLinks } from '../data/components';


function Navbar() {

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `p-2 pl-5 rounded transition-colors ${isActive
      ? "font-bold bg-blue-100"  // Active Styles
      : "text-gray-700 hover:bg-gray-200"      // Inactive Styles
      }`;
  };


  return (
    <>
      <div className="w-full h-full bg-gray-50 p-4 overflow-y-scroll overflow-x-hidden">
        <h1>SCU Design System</h1>

        <img className="max-w-50" src={logo} alt="SCU logo" />

        <h2 className="text-xl font-semibold">Style Guide</h2>

        <div className="flex flex-col">
          <NavLink to="/" className={getLinkClass}>
            Welcome
          </NavLink>
          <NavLink to="/style" className={getLinkClass}>
            Style
          </NavLink>
          <NavLink to="/colors" className={getLinkClass}>
            Colors
          </NavLink>
          <NavLink to="/favicon" className={getLinkClass}>
            Favicon
          </NavLink>
        </div>

        <h2 className="text-xl font-semibold">Content Types</h2>
        <div className="flex flex-col">
          {componentLinks.map((item) => (
            <NavLink key={item.id} to={`/components/${item.id}`} className={getLinkClass}>
              {item.name}
            </NavLink>
          ))}
        </div>


        <h2 className="text-xl font-semibold">Layout Components</h2>
        <div className="flex flex-col">
          <NavLink to="/header" className={getLinkClass}>
            Library Header
          </NavLink>
        </div>
      </div>
    </>
  )

}

export default Navbar;

import { NavLink } from 'react-router-dom';
import logo from '/scu_hor_pos_rgb_2c.png';
import { componentLinks } from '../data/components';


function Navbar() {

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `p-2 pl-5 rounded transition-colors cursor-pointer ${isActive
      ? "font-bold bg-gray-300"  // Active Styles
      : "text-gray-700 hover:bg-gray-200"      // Inactive Styles
      }`;
  };


  return (
    <>
      <div className="w-full h-full bg-gray-50 p-4 overflow-y-scroll overflow-x-hidden">

        <img className="max-w-50" src={logo} alt="SCU logo" />

        <h1 className="text-2xl mb-5 mx-2">Design System</h1>
        <h2 className="text-xl font-semibold mx-2">Style Guide</h2>

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
        </div>


        <h2 className="text-xl font-semibold mx-2">Downloadable Assets</h2>

        <div className="flex flex-col">
          <NavLink to="/logos" className={getLinkClass}>
            Logos &amp; Lockups
          </NavLink>
          <NavLink to="/favicon" className={getLinkClass}>
            Favicon
          </NavLink>
        </div>

        <h2 className="text-xl font-semibold mx-2">Content Types</h2>
        <div className="flex flex-col">
          {componentLinks.map((item) => (
            <NavLink key={item.id} to={`/components/${item.id}`} className={getLinkClass}>
              {item.name}
            </NavLink>
          ))}
        </div>


        <h2 className="text-xl font-semibold mx-2">Layout Components</h2>
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

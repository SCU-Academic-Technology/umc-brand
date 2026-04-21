import { NavLink } from 'react-router-dom';
import logo from '/scu_hor_pos_rgb_2c.png';

function Navbar({ items, loading }: { items: { name: string; html: string }[], loading?: boolean }) {

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `p-2 pl-5 rounded transition-colors cursor-pointer ${isActive
      ? "font-bold bg-gray-300"  // Active Styles
      : "text-gray-700 hover:bg-gray-200"      // Inactive Styles
      }`;
  };


  return (
    <>
      <div className="w-full h-full bg-gray-50 p-4 overflow-y-scroll overflow-x-hidden">
        <a href="https://www.scu.edu">
            <img className="max-w-50" src={logo} alt="SCU logo" width="1200" height="461" />
            <span className="sr-only">To scu.edu homepage</span>
        </a>
        <h1 className="text-2xl mb-5 mx-2">Design System</h1>
        <h2 className="text-xl font-semibold mx-2">Style Guide</h2>

        <div className="flex flex-col">
          <NavLink to="/" className={getLinkClass}>
            Welcome
          </NavLink>
          <NavLink to="/colors" className={getLinkClass}>
            Colors
          </NavLink>
          <NavLink to="/typography" className={getLinkClass}>
            Typography
          </NavLink>
        </div>


        <h2 className="text-xl font-semibold mx-2">Assets</h2>

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
          {loading ? (
            <svg viewBox="0 0 220 156" xmlns="http://www.w3.org/2000/svg" className="w-full mt-1">
              <g className="animate-pulse" fill="#d1d5db">
                <rect x="16" y="6"   width="130" height="15" rx="3" />
                <rect x="16" y="32"  width="160" height="15" rx="3" />
                <rect x="16" y="58"  width="100" height="15" rx="3" />
                <rect x="16" y="84"  width="145" height="15" rx="3" />
                <rect x="16" y="110" width="120" height="15" rx="3" />
                <rect x="16" y="136" width="155" height="15" rx="3" />
              </g>
            </svg>
          ) : (
            items.map((item, index) => (
              <NavLink key={index} to={`/components/${index}`} className={getLinkClass}>
                {item.name}
              </NavLink>
            ))
          )}
        </div>


        <h2 className="text-xl font-semibold mx-2">Layout Components</h2>
        <div className="flex flex-col">
          <NavLink to="/main-header" className={getLinkClass}>
            Main Header
          </NavLink>
          <NavLink to="/lockup-header" className={getLinkClass}>
            Header with Lockup
          </NavLink>
          <NavLink to="/no-lockup-header" className={getLinkClass}>
            Header without Lockup
          </NavLink>

          <NavLink to="/footer" className={getLinkClass}>
            Footer
          </NavLink>
        </div>
      </div>
    </>
  )

}

export default Navbar;

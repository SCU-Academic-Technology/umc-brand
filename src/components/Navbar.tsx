import { NavLink } from 'react-router-dom';


const componentLinks = [
  { id: "0", name: "Accordion" },
  { id: "1", name: "Agenda" },
  { id: "2", name: "Alert" },
  { id: "3", name: "Announcement" },
  { id: "4", name: "Billboard" },
];

function Navbar() {

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `p-2 rounded transition-colors ${isActive
      ? "font-bold bg-blue-100"  // Active Styles
      : "text-gray-700 hover:bg-gray-200"      // Inactive Styles
      }`;
  };


  return (
    <>
      <div className="w-full h-full bg-gray-50">
        <h1>SCU Design System</h1>

        <h2 className="text-xl font-semibold">Style Guide</h2>

        <div className="flex flex-col">
          <NavLink to="/styleguide">Style</NavLink>
        </div>

        <h2 className="text-xl font-semibold">Content Types</h2>
        <div className="flex flex-col">
          {componentLinks.map((item) => (
            <NavLink key={item.id} to={`/components/${item.id}`} className={getLinkClass}>
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  )

}

export default Navbar;

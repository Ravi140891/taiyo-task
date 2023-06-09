import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  // Define the styles to be applied to the active NavLink
  const activeStyles = {
    border: '2px solid white',
  };

  return (
    // The navigation bar container
    <nav className="w-full bg-green-500  mb-5 sm:mb-1">
      <div className="flex flex-col justify-center gap-8 py-5 sm:flex-row sm:gap-3">
        {/* NavLink to the Home page */}
        <NavLink
          // Apply the activeStyles if this NavLink is active
          style={({ isActive }) => (isActive ? activeStyles : {})}
          className="text-lg text-white px-[15px] py-[5px] rounded-lg flex items-center justify-center sm:py-1"
          to="/"
        >
          Home Page
        </NavLink>
        {/* NavLink to the Contact page */}
        <NavLink
          // Apply the activeStyles if this NavLink is active
          style={({ isActive }) => (isActive ? activeStyles : {})}
          className="text-lg text-white px-[15px] py-[5px] rounded-lg flex items-center justify-center sm:py-1"
          to="/contacts"
        >
          Contact Page
        </NavLink>
        {/* NavLink to the Covid Charts page */}
        <NavLink
          // Apply the activeStyles if this NavLink is active
          style={({ isActive }) => (isActive ? activeStyles : {})}
          className="text-lg text-white px-[15px] py-[5px] rounded-lg flex items-center justify-center sm:py-1"
          to="/charts"
        >
          Covid Charts
        </NavLink>
        {/* NavLink to the Covid Maps page */}
        <NavLink
          // Apply the activeStyles if this NavLink is active
          style={({ isActive }) => (isActive ? activeStyles : {})}
          className="text-lg text-white px-[15px] py-[5px] rounded-lg flex items-center justify-center sm:py-1"
          to="/maps"
        >
          Covid Maps
        </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;

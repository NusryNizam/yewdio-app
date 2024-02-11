import { sidebarData } from "../../../data/sidebar";
import SidebarItem from "../SidebarItem/SidebarItem";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {sidebarData.map(
        ({ name, icon, selectedIcon, route }) => (
          <SidebarItem
            key={name}
            name={name}
            icon={icon}
            selectedIcon={selectedIcon}
            route={route}
          />
        ),
      )}
    </aside>
  );
};

export default Sidebar;

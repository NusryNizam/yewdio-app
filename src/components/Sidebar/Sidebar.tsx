import "./Sidebar.scss";
import { sidebarData } from "../../../data/sidebar";
import SidebarItem from "../SidebarItem/SidebarItem";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {sidebarData.map(({ name, icon, route }) => (
        <SidebarItem key={name} name={name} icon={icon} route={route} />
      ))}
    </aside>
  );
};

export default Sidebar;

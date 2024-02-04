import Home from "@/../public/icons/icon-home.svg";
import Library from "@/../public/icons/icon-library.svg";
import Favourites from "@/../public/icons/icon-favourite.svg";

type SidebarType = {
  name: string;
  icon: string;
  route: string;
};

export const sidebarData: SidebarType[] = [
  {
    name: "Home",
    icon: Home as string,
    route: "/",
  },
  {
    name: "Library",
    icon: Library as string,
    route: "/library",
  },
  {
    name: "Favourites",
    icon: Favourites as string,
    route: "/favourites",
  },
];

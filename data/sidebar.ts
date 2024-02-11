import FavouritesSelected from "@/../public/icons/icon-favourite-selected.svg";
import Favourites from "@/../public/icons/icon-favourite.svg";
import HomeSelected from "@/../public/icons/icon-home-selected.svg";
import Home from "@/../public/icons/icon-home.svg";
import LibrarySelected from "@/../public/icons/icon-library-selected.svg";
import Library from "@/../public/icons/icon-library.svg";

type SidebarType = {
  name: string;
  icon: string;
  selectedIcon: string;
  route: string;
};

export const sidebarData: SidebarType[] = [
  {
    name: "Home",
    icon: Home as string,
    selectedIcon: HomeSelected as string,
    route: "/",
  },
  {
    name: "Library",
    icon: Library as string,
    selectedIcon: LibrarySelected as string,
    route: "/library",
  },
  {
    name: "Favourites",
    icon: Favourites as string,
    selectedIcon: FavouritesSelected as string,
    route: "/favourites",
  },
];

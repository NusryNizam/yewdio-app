"use client";

import { inter } from "@/utils/fonts";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./SidebarItem.scss";

type Props = {
  name: string;
  icon: string;
  selectedIcon: string;
  route: string;
};
const SidebarItem = ({
  name,
  icon: Icon,
  selectedIcon: SelectedIcon,
  route,
}: Props) => {
  const pathName = usePathname();
  const isActive = pathName === route;

  return (
    <Link
      href={route}
      className={`sidebar-item font-body-md ${
        inter.className
      } ${isActive ? "isActive" : null}`}
    >
      <Image
        src={isActive ? SelectedIcon : Icon}
        alt={name}
      />
      <span className="name">{name}</span>
    </Link>
  );
};

export default SidebarItem;

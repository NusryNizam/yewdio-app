"use client";

import { inter } from "@/utils/fonts";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./SidebarItem.scss";

type Props = {
  name: string;
  icon: string;
  route: string;
};
const SidebarItem = ({
  name,
  icon: Icon,
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
      <Image src={Icon} alt={name} />
      <span className="name">{name}</span>
    </Link>
  );
};

export default SidebarItem;

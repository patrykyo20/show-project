import Image from "next/image";
import { FC } from "react";
import navigationLinks from "../utils/NavigationLinks";
import Navigation from "./Navigation";
import Button from "@/components/button";

interface MenuProps {
  isOpen: boolean
};

const Menu:FC<MenuProps> = ({
  isOpen
}) => {
  return (
    <div 
      className={`fixed top-0 left-0 w-full h-full bg-primary
        px-[40px] py-[40px] transform transition-all z-10
        ease-in-out duration-500 flex flex-col justify-between
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`
      }
    >
      <Image 
        src="/logo.svg"
        alt="logo"
        width={152}
        height={24}
      />
      <nav>
        <ul
          className="flex text-textPrimary text-xl font-semibold
            items-center gap-[40px] flex-col"
        >
          {navigationLinks.map(nav => (
            <Navigation key={nav.link} link={nav.link} text={nav.text} />
          ))}
        </ul>
      </nav>
      <div className="flex md:justify-between items-end">
        <h1 className="hidden md:block text-secondary text-[20px] font-semibold mb-0 w-[300px]">Welcome to Click Craft</h1>
        <div className="flex w-full justify-between md:justify-end gap-[14px]">
          <Button px={4} py={2} text={"Sign In"} />
          <Button px={4} py={2} text={"Sign Out"} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
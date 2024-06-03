'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface NavigationProps {
  link: string;
  text: string;
}

const Navigation: FC<NavigationProps> = ({
  link,
  text,
}) => {
  const currentPath = usePathname();
  return (
    <li>
      <Link
        href={link}
        className={
          currentPath === link
            ? 'text-link'
            : `hover:text-link hover:border-secondary
            hover:drop-shadow-button transition-all
            ease-in-out duration-500`
          }
      >
        {text}
      </Link>
    </li>
  )
};

export default Navigation;
'use client';

import React, { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface AddButtonProps {
  link: string;
  icon: string;
  title: string;
  left: number;
  bottom: number;
};

const AddButton: FC<AddButtonProps> = ({link, icon, title, left, bottom}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const showTooltip = () => setTooltipVisible(true);
  const hideTooltip = () => setTooltipVisible(false);

  return (
    <Link href={link}>
      <button
        data-tooltip-target="tooltip-default"
        type="button"
        className={`flex justify-center border-4 items-center text-textSecondary rounded-full font-semibold hover:border-secondary
          hover:drop-shadow-button transition-all ease-in-out duration-500 w-12 h-12 text-[14px] md:text-[16px] border-secondary drop-shadow-button
          bg-button`
        }
        style={{ left: `${left}px`, bottom: `${bottom}px`, position: 'fixed' }} 
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        <Image src={icon} alt="ProjectIcon" width={30} height={30} />
      </button>

      <div
        id="tooltip-default"
        role="tooltip"
        className={`z-10 ${tooltipVisible ? 'visible opacity-100' : 'invisible opacity-0'}
          inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-600 drop-shadow-button bg-secondary rounded-lg
          shadow-sm text-textSecondary`
        }
        style={{ left: `${left + 60}px`, bottom: `${bottom + 5}px`, position: 'fixed' }}
      > 
        {title}
      <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </Link>
);

};

export default AddButton;

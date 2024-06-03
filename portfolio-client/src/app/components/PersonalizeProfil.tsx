'use client';

import Button from "@/components/button";
import CardLayout from "@/components/cardLayout";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const PersonalizeProfile = () => {
  const { user } = useUser();

  const gradientStyleHeadline = {
    backgroundImage: 'linear-gradient(to right, #865BFF, #627FFF)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  };

  console.log(user)

  return (
    <section className="bg-primary min-h-80 flex flex-col items-center p-[31px]">
      <h1
        className="text-textSecondary text-center text-[20px] md:text-[54px] mt-[12px] md:mt-[135px] font-bold"
      >
        5 minute set-up process
      </h1>
      <p className="hidden md:block text-[24px] text-textPrimary text-center mt-[24px]">
        Just take <strong>5 minutes</strong> to fill in some info, choose a killer template, and <br /> bam! Your personalized portfolio website is ready.
      </p>

      <CardLayout className="rounded-[30px] px-[18px] py-[14px] md:p-[50px] mt-[20px] md:mt-[68px]
        grid grid-cols-1 md:grid-cols-2 justify-center md:items-center max-w-[1520px]">

        <div className="hidden md:flex gap-[8px] items-center">
          <Image 
            src="/stars.svg"
            alt="stars"
            width={25}
            height={25}
          />
    
          <h6
            className="uppercase font-bold text-[16px]"
            style={gradientStyleHeadline}
          >
              How It Works
          </h6>
        </div>

        <h1
          className="hidden md:block text-textSecondary text-[20px] md:text-[44px]
            font-bold md:col-start-2 md:row-start-2"
        >
          Complete Your Profile
        </h1>

        <p className="text-[16px] md:text-[26px] text-textPrimary text-center md:text-start md:col-start-2 md:row-start-3">
          Just share your details, choose a template, and see your personal portfolio magically appear.
          Confirm or make any changes you like, and  Grab a special link to share your portfolio with everyone.
          Boost your online presence the easy way!
        </p>
        <div className="mt-[24px] flex justify-center md:justify-start md:col-start-2 md:row-start-4">
          <Button px={4} py={3} text={"Complete Your Profile"} active={true} />
        </div>

        <div className="mt=[20px] flex justify-center md:col-start-1 md:row-start-1 md:row-end-5">
          <Image
            src="/man.svg"
            alt="man"
            width={275}
            height={253}
            className="md:w-[658px] md:h-[545px]"
          />
        </div>
      </CardLayout>
    </section>
  );
};

export default PersonalizeProfile;
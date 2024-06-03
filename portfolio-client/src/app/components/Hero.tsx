import Button from "@/components/button";
import Image from "next/image";
import gradientStyleHeadline from "../utils/gradientStyles";

const Hero = () => {
  return (
    <main className="bg-primary min-h-80 flex flex-col items-center p-[24px]">
      <div className="flex gap-[8px] items-center md:mt-[100px]">
        <Image 
          src="/stars.svg"
          alt="stars"
          width={25}
          height={25}
        />
  
        <h6
          className="uppercase font-bold"
          style={gradientStyleHeadline}
        >
            welcome to click craft
        </h6>
      </div>

      <h1
        className="text-textSecondary text-center text-[24px] md:text-[72px] mt-[12px] md:mt-[22px] font-bold"
      >
        Your Story, Your Way <br />
        Build Your Personal Portfolio
      </h1>

      <p className="text-[14px] md:text-[24px] text-textPrimary text-center mt-[20px] md:mt-[22px]">
        Showcase your journey by crafting a personal <br />
        portfolio in minutes
      </p>

      <div className="flex flex-col md:flex-row gap-[20px] mt-[20px] md:mt-[40px]">
        <Button px={4} py={3}  text={"Get started for free"} active={true} />
        <Button px={4} py={3} text={"Watch Video"} />
      </div>
      <div className="absolute hidden md:block ">
        <Image 
          src={"/shades.svg"}
          alt="shades"
          width={360}
          height={340}
        />
      </div>
      <div className="absolute hidden md:block left-20 top-96">
        <Image 
          src={"/shades.svg"}
          alt="shades"
          width={360}
          height={340}
        />
      </div>
      <div className="absolute hidden md:block right-20 top-96">
        <Image 
          src={"/shades.svg"}
          alt="shades"
          width={360}
          height={340}
        />
      </div>
      <Image 
        src={"/hero.png"}
        alt={"hero"} 
        width={1605}
        height={619}
        className="mt-10 md:mt-0"
      />
    </main>
  );
};

export default Hero;
import Image from "next/image"

const SkeletonProjectCardHome = () => {
  return (
    <article className="pt-[40px] md:pt-[72px] lg:pt-[119px] px-[16px] md:px-[20px] lg:px-[39px] pb-[42px] border-r-4 border-b-4 border-l-4 border-headline
      rounded-[30px] border-t-[0.5px] max-w-[720px]">
      <div className="grid gap-[8px]">
        <Image 
          src="/stars.svg"
          alt="stars"
          width={25}
          height={25}
        />
        <div className="h-4 bg-headline rounded-full dark:bg-gray-700 w-36"></div>
      </div>

      <div className="h-12 bg-headline rounded-full dark:bg-gray-700 w-64 mt-[40px]"></div>


      <div className="h-8 bg-headline rounded-full dark:bg-gray-700 w-36 mt-[36px]"></div>


      <div className="flex items-center justify-center 
      bg-headline dark:bg-gray-700 w-[250px] sm:w-[500px] md:w-[634px]
        mt-[30px] md:mt-[40px] lg:mt-[90px] rounded-lg h-[330px]"
      >
        <Image
          src={'/image.svg'}
          alt="imageIcon"
          width={50}
          height={50}
        />
      </div>
      <div className="h-12 bg-headline rounded-full dark:bg-gray-700 w-36 mt-8"></div>

    </article>
  );
};

export default SkeletonProjectCardHome;
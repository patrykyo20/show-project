import Image from "next/image";

const SkeletonProjectCard = () => {
  return (
      <div role="status" className="animate-pulse w-full">
        <article className="px-2 py-2 border-r-2 border-b-4 border-l-2 border-headline border-t-[0.5px] rounded-xl flex flex-col justify-between
          min-h-[300px] overflow-hidden items-center"
        >
          <div className="flex items-center justify-center 
            h-[226px] bg-headline rounded dark:bg-gray-700 w-[300px] md:w-[431px]"
          >
            <Image
              src={'/image.svg'}
              alt="imageIcon"
              width={50}
              height={50}
            />
          </div>
            
              <div className="flex mt-4 justify-between w-full items-center px-4">
                <div className="h-12 bg-headline rounded-full dark:bg-gray-700 w-36 mb-4"></div>
        
                <div className="flex gap-6 justify-between">
                  <div className="h-8 bg-headline rounded-full dark:bg-gray-700 w-10 mb-4"></div>
                  <div className="h-8 bg-headline rounded-full dark:bg-gray-700 w-10 mb-4"></div>
                </div>
              </div>
            </article>
      </div>
  );
};

export default SkeletonProjectCard;
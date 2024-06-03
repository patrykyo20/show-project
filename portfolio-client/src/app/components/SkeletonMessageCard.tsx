import Skeleton from "@/components/skeleton";

const SkeletonMessageCard = () => {
  return (
      <article className="flex items-center gap-4  max-w-[324px] md:max-w-[670px]">
        <div className="border-r-2 border-b-4 border-l-2 border-headline
          rounded-[20px] border-t-[0.5px] p-5 flex flex-col justify-between
          min-w-[200px] md:min-w-[400px]">
          <div className="h-5 bg-headline rounded-xl dark:bg-gray-700 w-100 animate-pulse mx-3"></div>
          <div className="h-4 bg-headline rounded-xl dark:bg-gray-700 w-100 animate-pulse mx-3 mt-2"></div>
          <div className="h-5 bg-headline rounded-xl dark:bg-gray-700 w-100 animate-pulse mx-3 mt-2"></div>
          <div className="flex justify-between mt-5 md:mt-2 px-4">
            <div className="h-8 bg-headline rounded-full dark:bg-gray-700 w-10 animate-pulse"></div>
            <div className="h-8 bg-headline rounded-full dark:bg-gray-700 w-10 animate-pulse"></div>
          </div>
        </div>
        <div className="w-0 h-0 
          border-t-[16px] border-t-primary
          border-l-[24px] border-l-headline
          border-b-[16px] border-b-primary"
        >

        </div>

        <div className="flex flex-col justify-center text-textSecondary text-center items-center text-[10px] md:text-[20px]">
          <Skeleton width={75} height={75} />
          <div className="h-4 bg-headline rounded-md dark:bg-gray-700 w-10 mt-2 animate-pulse"></div>
        </div>
      </article>
  );
};

export default SkeletonMessageCard;
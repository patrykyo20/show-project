import { FC } from "react";

interface SkeletonProps {
  width: number;
  height: number;
}

const Skeleton: FC<SkeletonProps> = ({
  width,
  height,
}) => {
  return (
    <div role="status" className="animate-pulse">
      <div
        className="bg-headline rounded-full"
        style={{ width: `${width}px`, height: `${height}px` }}
      ></div>
    </div>
  )
}

export default Skeleton;

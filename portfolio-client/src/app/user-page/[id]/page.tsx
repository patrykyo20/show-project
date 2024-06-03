'use client';

import Image from "next/image";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Button from "@/components/button";
import Link from "next/link";
import { useGetUserProjectsQuery } from "@/lib/slices/projects/projectsApi";
import { useGetUserMessagesQuery } from "@/lib/slices/projects/messagesApi";
import ProjectCard from "@/app/components/ProjectCard";
import Project from "@/types/Project";
import SkeletonProjectCard from "@/app/components/SkeletonProjectCard";
import Skeleton from "@/components/skeleton";
import MessageCard from "@/app/components/MessageCard";
import Message from "@/types/Message";
import SkeletonMessageCard from "@/app/components/SkeletonMessageCard";

const UserPage = () => {
  const { user } = useUser();

  const page = 1; 
  const pagePerSize = 2;
  const order = 'asc';
  const sort = 'visits'; 
  
  const { data: projects, error, isLoading } = useGetUserProjectsQuery({
    userId: user ? user.id : undefined,
    page,
    pagePerSize,
    order,
    sort,
  });

  const { data: comments } = useGetUserMessagesQuery({
    userId: user ? user.id : undefined,
    page,
    pagePerSize,
    order,
    sort,
  });

  return (
    <main className="grid place-items-center min-h-screen relative mt-24">
      <section
        className="w-[90%] xl:w-[68%] px-[22px] xl:px-[144px] pt-[100px] xl:pt-[138px] pb-[64px] border-t-2 border-l-2 border-r-2 border-headline
        border-b-4 rounded-t-20 rounded-r-20 rounded-l-20 rounded-xl shadow-customShadow relative max-w-[1300px] mb-32"
      >
        {user ? (
          <Image
            src={user?.imageUrl}
            alt={"userImage"}
            width={250}
            height={250}
            className="absolute left-1/2 transform -translate-x-1/2 w-[125px] h-[125px] xl:w-[200px] xl:h-[200px] rounded-full top-[-3%] md:top-[-8%]"
            style={{ left: 'calc(50%)' }}
          />
        ) : (
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-[125px] h-[125px] xl:w-[200px] xl:h-[200px] rounded-full top-[-3%] md:top-[-8%]"
            style={{ left: 'calc(50%)' }}  
          >
            <Skeleton width={200} height={200} />
          </div>
        )}
          <div
            className="absolute left-[20px] xl:left-[40px] top-[150px] md:top-[60px] xl:top-[60px]"
          >
            <Link href={"/user-profile"} >
              <Button px={4} py={2} text={"Edit profile"} active={true} />
            </Link>
          </div>
          <div
            className="absolute right-[20px] xl:right-[40px] top-[150px] md:top-[60px] xl:top-[60px]"
          >
            <SignOutButton>
              <Button px={4} py={2} text={"Log out"} />
            </SignOutButton>
          </div>

          {user ? 
            <h1 className="text-center text-textSecondary text-[34px] font-bold">
              {user?.fullName}
            </h1> 
            : 
            <div className="flex justify-center">
              <Skeleton width={150} height={45} /> 
            </div>
          }
          <div className="flex flex-col md:flex-row gap-5 justify-between mt-[70px] items-center">
              <h3 className="text-textSecondary text-[34px] font-bold">
                My Portfolios
              </h3>
            <div className="flex flex-wrap gap-8">
              <Link href={`/portfolios/${user?.id}`}>
                <Button px={4} py={2} text={"Show all projects"} />
              </Link>
              <Link href={"/create-project"}>
                <Button px={4} py={2} text={"Create portfolios"} active={true} />
              </Link>
          </div>
          </div>
          
          <div className="mt-[20px] flex flex-col md:flex-row justify-between gap-5">
            {projects && projects.length > 0 ? (
              projects.slice(0, 2).map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              Array.from({ length: 2 }).map((_, index) => (
                <SkeletonProjectCard key={index} />
              ))
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-5 justify-between mt-[50px] items-center">
              <h3 className="text-textSecondary text-[34px] font-bold">
                Last Message
              </h3>
            <div className="flex flex-wrap gap-8">
              <Link href={`/messages/${user?.id}`}>
                <Button px={4} py={2} text={"Show all messages"} />
              </Link>
              <Link href={"/create-message"}>
                <Button px={4} py={2} text={"Create message"} active={true} />
              </Link>
          </div>
          </div>

          <div className="mt-[50px] flex items-center flex-col gap-5">
            {comments && comments.length > 0 ? (
              comments.map((message: Message) => (
                <MessageCard key={message.id} message={message} />
              ))
            ) : (
              Array.from({ length: 2 }).map((_, index) => (
                <SkeletonMessageCard key={index} />
              ))
            )}
          </div>
      </section>
    </main>
  );
};

export default UserPage;
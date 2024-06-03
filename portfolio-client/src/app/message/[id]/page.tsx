'use client';

import { useGetAllProjectsQuery } from "@/lib/slices/projects/projectsApi";
import { useGetMessageQuery,
  useAddVisitsMutation,
  useDeleteMessageMutation,
  useAddLikesMutation
} from "@/lib/slices/projects/messagesApi";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Carousel from "@/app/components/Carousel";
import Button from "@/components/button";
import Link from "next/link";

const Message = ({ params }: { params: { id: number }}) => {
  const { id } = { id: params.id };
  const { user } = useUser();
  const [addLikes] = useAddLikesMutation();
  const [addVisits] = useAddVisitsMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const timeoutRef = useRef<any>(null);

  const { data: message, error } = useGetMessageQuery(id);

  const { data: projects } = useGetAllProjectsQuery({
    page: 1,
    pagePerSize: 8,
    order: 'desc',
    sort: 'visits',
  });

  const [likes, setLikes] = useState<string[]>(message?.likes || []);

  useEffect(() => {
    setLikes(message?.likes || [])

    addVisit();
  }, [addVisits, message])

  const handleAddLike = async () => {
    if (user?.fullName) {
      const userHasLiked = likes.includes(user.fullName);

      let updatedLikes;
      if (userHasLiked) {
        updatedLikes = likes.filter(like => like !== user.fullName);
      } else {
        updatedLikes = [...likes, user.fullName];
      }

      setLikes(updatedLikes);

      const updatedData = { ...message, likes: updatedLikes };

      try {
        await addLikes({ id: message?.id, data: updatedData });
        console.log('Project likes updated successfully');
      } catch (err) {
        console.error('Error updating project likes:', err);
      }
    };
  };

  const addVisit = useCallback(async () => {
    const handleVisit = async () => {
      if (message) {
        const visits = (message.visits || 0) + 1;
        const updatedData = { ...message, visits };

        try {
          await addVisits({ id: message.id, data: updatedData });
        } catch (error) {
          console.error('Error updating project visits:', error);
        }
      } else {
        console.error('Project is not defined');
      }
    };

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(handleVisit, 10000);

  }, [message, addVisits]);

  const handleDeleteMessage = async (messageId: number) => {
    try {
      await deleteMessage({ id: messageId });
      console.log(`Project with ID ${messageId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };


  return (
    <>
      {message ?
        <h1
          className="text-textSecondary text-center text-[40px] md:text-[54px] mt-[12px] md:mt-[12px] font-bold"
        >
          {message?.title}
        </h1> 
      :
      
        <div className="flex justify-center mt-[12px]">
          <div role="status" className="animate-pulse">
            <div className="h-12 bg-headline rounded-2xl dark:bg-gray-700 w-[280px] md:w-[400px] mb-4"></div>
          </div>
        </div>
      }

      <section className="mt-20 grid justify-center w-full pb-24">
        <article className="lg:max-w-[1500px] gap-20 p-3 md:p-4">
  
          <div className="flex flex-col justify-between">
            <h6 className="text-textSecondary text-[20px] mt-4">Author</h6>
            <Link className="flex mt-5 gap-5 items-end" href={`/user-page/${message?.userId}`}>
              <Image 
                src={message?.authorImage || ''}
                alt={message?.author || 'authorImage'}
                width={75}
                height={75}
              />
              <p className="text-headline text-[36px] font-semibold">{message?.author}</p>
            </Link>
            <h6 className="text-textSecondary text-[20px] mt-10">Comment</h6>
            {message ?
              <p className="text-textPrimary text-[20px] mt-4 min-h-72">
                {message?.message}
              </p>
              :                   
              <div role="status" className="animate-pulse mt-2">
                <div className="h-72 bg-headline rounded-2xl dark:bg-gray-700  w-[280px] sm:w-[350px] md:w-[500px] mb-4"></div>
              </div>
            }

            <h6 className="text-textSecondary text-[20px] mt-4">Rate</h6>
            <div className="flex gap-6 items-center mt-2 transition-all">
              <span className="flex gap-2 text-textSecondary text-[16px] font-medium">
                <Image
                  src="/heart.svg"
                  alt="heart"
                  width={25}
                  height={25}
                  onClick={handleAddLike}
                />
                {likes.length}
              </span>
              <span className="flex gap-2 text-textSecondary text-[16px] font-medium">
                <Image
                  src="/eye.svg"
                  alt="eye"
                  width={25}
                  height={25}
                />
                {message?.visits}
              </span>
            </div>
          </div>
          <div className="flex gap-5 mt-10">
            {user && user?.id === message?.userId &&
            <>
              <Link href={`/create-message/${message?.id}`}>
                <Button px={4} py={2} text={"Edit"} />
              </Link>
                <Button
                  px={4}
                  py={2}
                  text={"Delete"}
                  onClick={() => handleDeleteMessage(message?.id)}
                />
              </>
            }
          </div>

          <h1 className="text-textSecondary text-center text-[30px] md:text-[40px] mt-[12px] md:mt-[12px] font-bold lg:col-span-2">
            See projects!
          </h1>

          <div className="lg:col-span-2 grid justify-center mt-20">
            <Carousel projects={projects} /> 
          </div>
        </article>
      </section>  
    </>
  );
};

export default Message;

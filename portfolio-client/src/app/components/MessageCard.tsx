'use client';

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useAddLikesMutation } from "@/lib/slices/projects/messagesApi";
import { FC, useState } from "react";
import Message from "@/types/Message";
import CardLayout from "@/components/cardLayout";

interface MessageCardProps {
  message: Message;
}

const MessageCard: FC<MessageCardProps> = ({ message }) => {
  const { user } = useUser();
  const [addLikes] = useAddLikesMutation();
  const [likes, setLikes] = useState<string[]>(message?.likes || []);

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
        await addLikes({ id: message.id, data: updatedData });
        console.log('Project likes updated successfully');
      } catch (err) {
        console.error('Error updating project likes:', err);
      }
    }
  };

  return (
      <article className="flex items-center gap-4  max-w-[324px] md:max-w-[670px]">
        <CardLayout className="p-5 flex flex-col justify-between min-w-[200px] md:min-w-[400px]">
          <Link href={`/message/${message?.id}`} className="inline-block">
            <p className="text-textPrimary text-[15px] md:text-[20px]">{message?.message}</p>
          </Link>
          <div className="flex justify-between mt-5 md:mt-10 px-4">
            <span className="flex gap-2 text-textSecondary text-[12px] md:text-[20px] font-medium items-center">
              <Image
                src="/heart.svg"
                alt="heart"
                width={25}
                height={25}
                className="w-[20px] md:w-[25px]"
                onClick={handleAddLike}
              />
              {likes?.length}
            </span>
            <span className="flex gap-2 text-textSecondary text-[12px] md:text-[20px] font-medium items-center">
              <Image
                src="/eye.svg"
                alt="eye"
                width={25}
                height={25}
                className="w-[20px] md:w-[25px]"
              />
              {message?.visits}
            </span>
          </div>
        </CardLayout>
        <div className="w-0 h-0 
          border-t-[16px] border-t-primary
          border-l-[24px] border-l-headline
          border-b-[16px] border-b-primary"
        >

        </div>

        <div className="flex flex-col justify-center text-textSecondary text-center items-center text-[10px] md:text-[20px]">
          <Image
            src={message.authorImage ? message.authorImage : "/userImage.svg"}
            alt={"userImage"}
            width={36}
            height={36}
            className="w-[36px] md:w-[75px] rounded-full"
          />
          {message?.author}
        </div>
      </article>
  );
};

export default MessageCard;
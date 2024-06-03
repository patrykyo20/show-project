'use client'

import MessageCatalog from "@/app/components/MessageCatalog";
import { useGetUserMessagesQuery } from "@/lib/slices/projects/messagesApi";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const MessagesForUser = ({ params }: { params: { userId: string }}) => {
  const userId = params.userId;
  const { user } = useUser();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const pagePerSize = parseInt(searchParams.get('pagePerSize') || '8', 10);
  const order = searchParams.get('order') || 'asc';
  const sort = searchParams.get('sort') || 'visits';
  
  const { data: messages, refetch } = useGetUserMessagesQuery({
    userId,
    page,
    pagePerSize,
    order,
    sort
  });

  useEffect(() => {
    refetch()
  }, [page, pagePerSize, order, sort, refetch]);
  
  return (
    <>
      <h1
        className="text-textSecondary text-center text-[40px] md:text-[54px] mt-[12px] md:mt-[56px] font-bold"
      >
        All Messages
      </h1>

      <MessageCatalog messages={messages} messagesLength={messages ? messages.length : 0} page={page} pagePerSize={pagePerSize} />
    </>
  );
};

export default MessagesForUser;
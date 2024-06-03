'use client'

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { useGetAllMessagesQuery, useGetMessagesLengthQuery } from '@/lib/slices/projects/messagesApi';
import MessageCatalog from '../components/MessageCatalog';

const Messages = () => {
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const pagePerSize = parseInt(searchParams.get('pagePerSize') || '8', 10);
  const order = searchParams.get('order') || 'asc';
  const sort = searchParams.get('sort') || 'visits';
  
  const { data: messages, refetch } = useGetAllMessagesQuery({
    page,
    pagePerSize,
    order,
    sort
  });

  const { data: messagesLength } = useGetMessagesLengthQuery();

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

      <MessageCatalog messages={messages} messagesLength={messagesLength ?? 0} page={page} pagePerSize={pagePerSize} />
    </>
  );
};

export default Messages;
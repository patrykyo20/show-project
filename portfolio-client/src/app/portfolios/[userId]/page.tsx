'use client'

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { useGetUserProjectsQuery } from '@/lib/slices/projects/projectsApi';
import ProjectCatalog from '../../components/ProjectCatalog';
import { useUser } from '@clerk/nextjs';

const PortfoliosForUser = ({ params }: { params: { userId: string }}) => {
  const userId = params.userId;
  const { user } = useUser();
  const searchParams = useSearchParams();

  console.log(userId)


  const page = parseInt(searchParams.get('page') || '1', 10);
  const pagePerSize = parseInt(searchParams.get('pagePerSize') || '9', 10);
  const order = searchParams.get('order') || 'asc';
  const sort = searchParams.get('sort') || 'visits';

  const { data: projects, error, isLoading } = useGetUserProjectsQuery({
    userId,
    page,
    pagePerSize,
    order,
    sort,
  });

  console.log(projects)
  
  return (
    <>
      <h1
        className="text-textSecondary text-center text-[40px] md:text-[54px] mt-[12px] md:mt-[56px] font-bold"
      >
        {user?.fullName} Projects
      </h1>

      <ProjectCatalog projects={projects} projectsLength={projects?.length ? projects?.length : 0} page={page} pagePerSize={pagePerSize} />
    </>
  );
};

export default PortfoliosForUser;
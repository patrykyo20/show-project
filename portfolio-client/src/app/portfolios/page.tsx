'use client'

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { useGetAllProjectsQuery, useGetProjectsLengthQuery } from '@/lib/slices/projects/projectsApi';
import ProjectCatalog from '../components/ProjectCatalog';

const Projects = () => {
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const pagePerSize = parseInt(searchParams.get('pagePerSize') || '9', 10);
  const order = searchParams.get('order') || 'desc';
  const sort = searchParams.get('sort') || 'visits';
  
  const { data: projects, refetch } = useGetAllProjectsQuery({
    page,
    pagePerSize,
    order,
    sort
  });

  const { data: projectsLength } = useGetProjectsLengthQuery();

  useEffect(() => {
    refetch()
  }, [page, pagePerSize, order, sort, refetch]);
  
  return (
    <>
      <h1
        className="text-textSecondary text-center text-[40px] md:text-[54px] mt-[12px] md:mt-[56px] font-bold"
      >
        All Projects
      </h1>

      <ProjectCatalog projects={projects} projectsLength={projectsLength ?? 0} page={page} pagePerSize={pagePerSize} />
    </>
  );
};

export default Projects;
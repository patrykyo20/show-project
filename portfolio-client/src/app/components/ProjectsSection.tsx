'use client';

import ProjectCardHome from "./ProjectCardHome";
import { useGetAllProjectsQuery } from '../../lib/slices/projects/projectsApi';
import SkeletonProjectCardHome from "./SkeletonProjectCardHome";
import Project from "@/types/Project";

const ProjectSection = () => {
  const { data: projects, error, isLoading, refetch } = useGetAllProjectsQuery({
    page: 1,
    pagePerSize: 4,
    order: 'asc',
    sort: 'visits'
  });

  return (
    <section className="px-[20px] md:px-[40px] lg:px-[200px] py-[135px]"> 
      <h1
        className="text-textSecondary text-center text-[20px] md:text-[54px] mt-[12px] md:mt-[135px] font-bold"
      >
        Top Rated Portfolios
      </h1>
      <div className="mt-[35px] md:mt-[135px] flex flex-wrap gap-[30px] justify-center">
        {projects ? (
          projects.map((project: Project) => (
            <ProjectCardHome key={project.id} project={project} />
          ))
        ) : isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonProjectCardHome key={index} />
          ))
        ) : (
          <p>Failed to load projects</p>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;

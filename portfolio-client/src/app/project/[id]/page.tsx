'use client';

import { useAddVisitsMutation, useDeleteProjectMutation, useGetAllProjectsQuery, useGetProjectQuery } from "@/lib/slices/projects/projectsApi";
import { useAddLikesMutation } from "@/lib/slices/projects/projectsApi";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Carousel from "@/app/components/Carousel";
import Button from "@/components/button";
import Link from "next/link";

const ProjectPage = ({ params }: { params: { id: number }}) => {
  const {id} = { id: params.id };
  const { user } = useUser();
  const [addLikes] = useAddLikesMutation();
  const [addVisits] = useAddVisitsMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const timeoutRef = useRef<any>(null);

  const { data: project, error } = useGetProjectQuery({ id });

  const { data: projects } = useGetAllProjectsQuery({
    page: 1,
    pagePerSize: 8,
    order: 'desc',
    sort: 'visits',
  });

  const [likes, setLikes] = useState<string[]>(project?.likes || []);

  useEffect(() => {
    setLikes(project?.likes || [])

    addVisit();
  }, [addVisits, project])

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

      const updatedData = {
        ...project,
        likes: updatedLikes,
        image: project?.image || 'default-image-url',  
        title: project?.title || 'Default Title',
        description: project?.description || 'Default Description', 
        technologies: project?.technologies || [],
        visits: project?.visits || 0,
        repository: project?.repository || '',
        linkedin: project?.linkedin || '',
        userId: project?.userId || '',
      };
  
      try {
        await addLikes({ id: project?.id, data: updatedData });
      } catch (err) {
        console.error('Error updating project likes:', err);
      }
    };
  };

  const addVisit = useCallback(async () => {
    const handleVisit = async () => {
      if (project) {
        const visits = (project.visits || 0) + 1;
        const updatedData = { ...project, visits };

        try {
          await addVisits({ id: project.id, data: updatedData });
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

  }, [project, addVisits]);

  const handleDeleteProject = async (projectId: number | undefined) => {
    try {
      await deleteProject({ id: projectId });
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };


  return (
    <>
      {project ?
        <h1
          className="text-textSecondary text-center text-[40px] md:text-[54px] mt-[12px] md:mt-[12px] font-bold"
        >
          {project?.title}
        </h1> 
      :
      
        <div className="flex justify-center mt-[12px]">
          <div role="status" className="animate-pulse">
            <div className="h-12 bg-headline rounded-2xl dark:bg-gray-700 w-[280px] md:w-[400px] mb-4"></div>
          </div>
        </div>
      }

      <section className="mt-20 grid justify-center w-full pb-24">
        <article className="lg:max-w-[1500px] grid lg:grid-cols-2 gap-20 p-3 md:p-4">
          {project ? <Image
            src={project?.image?.[0] || '/projectImage.svg'}
            alt={project?.title || ''}
            width={700}
            height={400}
            className="rounded-md mx-auto my-0"
          /> : 
          <div role="status" className="animate-pulse mt-2">
            <div className="h-[400px] bg-headline rounded-xl dark:bg-gray-700 w-auto mb-4"></div>
          </div>
        }
        
          <div className="flex flex-col justify-between">
            {project ?
              <h6 className="text-textSecondary text-[26px] font-semibold">
                {project?.title}
              </h6> 
              :                   
              <div role="status" className="animate-pulse">
                <div className="h-6 bg-headline rounded-full dark:bg-gray-700 w-36 mb-4"></div>
              </div>
            }

            <h6 className="text-textSecondary text-[20px] mt-4">About</h6>
            {project ?
              <p className="text-textPrimary text-[20px] mt-2">
                {project?.description}
              </p>
              :                   
              <div role="status" className="animate-pulse mt-2">
                <div className="h-36 bg-headline rounded-2xl dark:bg-gray-700  w-[280px] sm:w-[350px] md:w-[500px] mb-4"></div>
              </div>
            }
            <h6 className="text-textSecondary text-[20px] mt-4">Technologies</h6>
            <div className="flex gap-2 flex-wrap">
            {project ? (
              project?.technologies.map((technology: string) => (
               <p className="text-[18px] text-headline" key={technology}>{technology}</p>
              ))
            ) : (
              <div role="status" className="animate-pulse mt-2">
                <div className="h-8 bg-headline rounded-xl dark:bg-gray-700 w-[280px] sm:w-[320px] md:w-[400px] mb-4"></div>
              </div>
            )}
            </div>
            <h6 className="text-textSecondary text-[20px] mt-4">Socials</h6>
            <div className="flex gap-5 mt-2">
              <a href={project?.repository} >
                <Image src={'/github.svg'} alt="github" width={25} height={25} />
              </a>

              <a href={project?.linkedin} >
                <Image src={'/linkedin.svg'} alt="github" width={25} height={25} />
              </a>
            </div>
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
                {project?.visits}
              </span>
            </div>
          </div>
          <div className="grid-cols-2 left-20 p-2 flex gap-5">
            <div className="grid-cols-2 left-20 p-2 flex gap-5">
              {user && user?.id === project?.userId &&
              <>
                <Link href={`/create-project/${project?.id}`}>
                  <Button px={4} py={2} text={"Edit"} />
                </Link>
                  <Button
                    px={4}
                    py={2}
                    text={"Delete"}
                    onClick={() => handleDeleteProject(project?.id)}
                  />
                </>
              }
            </div>
          </div>

          <h1 className="text-textSecondary text-center text-[30px] md:text-[40px] mt-[12px] md:mt-[12px] font-bold lg:col-span-2">
            See more projects!
          </h1>

          <div className="lg:col-span-2 grid justify-center">
            <Carousel projects={projects} /> 
          </div>
        </article>
      </section>  
    </>
  );
};

export default ProjectPage;

import { FC, useCallback } from "react";
import filter from "../utils/filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Project from "@/types/Project";
import ProjectCard from "./ProjectCard";
import SkeletonProjectCard from "./SkeletonProjectCard";

interface ProjectCatalogProps {
  projects: Project[] | undefined;
  projectsLength: number;
  page: number;
  pagePerSize: number;
}

const ProjectCatalog: FC<ProjectCatalogProps> = ({
  projects,
  projectsLength,
  page,
  pagePerSize,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  );

  return (
    <main className='grid justify-center pb-48 px-3'>
      <div className='flex justify-end max-w-[1700px]'>
        <form className='flex gap-4 mt-5'>
          <select
            name="order"
            id="orderSelect"
            className="px-2 py-4 rounded-lg border-[#2A2B3A] border-4 bg-primary text-textSecondary"
            onChange={(event) => {
              const selectedValue = event.target.value;
              const queryString = createQueryString('order', selectedValue);
              router.push(pathname + '?' + queryString);
            }}
          >
            <option value="" disabled selected>
              Order by
            </option>
            {filter.order.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            name="sort"
            id="sortSelect"
            className="px-2 py-4 rounded-lg border-[#2A2B3A] border-4 bg-primary text-textSecondary"
            onChange={(event) => {
              const selectedValue = event.target.value;
              const queryString = createQueryString('sort', selectedValue);
              router.push(pathname + '?' + queryString);
            }}
          >
            <option value="" disabled selected>
              Sort by
            </option>
            {filter.sort.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </form>
      </div>

      <section className="grid lg:grid-cols-2 xl:grid-cols-3 w-full justify-between max-w-[1700px] mt-10 gap-x-[164px] gap-y-[80px] transition-all">
        {projects && projects.length > 0 ? (
          projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          Array.from({ length: pagePerSize }).map((_, index) => (
            <SkeletonProjectCard key={index} />
          ))
        )}
      </section>

      {projectsLength &&
        <nav aria-label="Page navigation example transition-all">
          <ul className="-space-x-px text-base h-10 mt-20 flex justify-center gap-3 transition-all">
            <li>
              <button
                disabled={page === 1}
                className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border
                border-gray-300 rounded-lg ${page === 1 ? 'text-textPrimary' : 'text-textSecondary'}`}
                onClick={(event) => {
                  const button = event.target as HTMLButtonElement;
                  const selectedValue = button.value;
                  const queryString = createQueryString('page', String(page - 1));
                  router.push(pathname + '?' + queryString);
                }}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: Math.ceil(projectsLength / pagePerSize) }, (_, index) => (
              <li key={index + 1}>
                <button
                  className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border
                    border-gray-300 rounded-lg  text-textSecondary transition-allq ${page === index + 1 ? 'bg-secondary' : ''}`}
                  value={index + 1}
                  onClick={(event) => {
                    const button = event.target as HTMLButtonElement;
                    const selectedValue = button.value;
                    const queryString = createQueryString('page', selectedValue);
                    router.push(pathname + '?' + queryString);
                  }}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                disabled={page === Math.ceil(projectsLength / pagePerSize)}
                className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border
                  border-gray-300 rounded-lg ${page === Math.ceil(projectsLength / pagePerSize) ?
                  'text-textPrimary' : 'text-textSecondary'}`}
                onClick={(event) => {
                  const button = event.target as HTMLButtonElement;
                  const selectedValue = button.value;
                  const queryString = createQueryString('page', String(page + 1));
                  router.push(pathname + '?' + queryString);
                }}
              >
                Next
              </button>
            </li>

          </ul>
        </nav>
      }
    </main>
  );
};

export default ProjectCatalog;
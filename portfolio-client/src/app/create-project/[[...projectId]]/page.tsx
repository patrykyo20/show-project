'use client';

import { useUser } from "@clerk/nextjs";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useMemo, useState } from "react";
import Multiselect from 'multiselect-react-dropdown';
import Button from "@/components/button";
import Image from "next/image";
import technologies from "../../utils/technologies";
import Project from "@/types/Project";
import { useGetProjectQuery } from "@/lib/slices/projects/projectsApi";
import Modal from "@/app/components/Modal";
import { useAddProjectMutation, usePatchProjectMutation } from '@/lib/slices/projects/projectsApi';
import { useRouter } from "next/navigation";

interface Technology {
  name: string;
  id: number | null;
};

type TechnologiesList = Technology[];

const CreateProject = ({ params }: { params: { projectId: number } }) => {
  const { user } = useUser();
  const router = useRouter()

  const projectId = params.projectId;
  const { data: project, error } = useGetProjectQuery({id: projectId});

  const [title, setTitle] = useState<string>('');
  const [repository, setRepository] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const [selectedTechnologies, setSelectedTechnologies] = useState<TechnologiesList>([]);
  const [image, setImage] = useState<string>('');
  const [previewSource, setPreviewSource] = useState<string>('');

  const [status, setStatus] = useState<string>('');

  const [addProject] = useAddProjectMutation();
  const [patchProject] = usePatchProjectMutation();

  useMemo(() => {
    if (project) {
      setTitle(project.title);
      setRepository(project.repository);
      setDescription(project.description);
      setLinkedin(project.linkedin);

      const mappedTechObjects = project.technologies.map((techName) => {
        const techObject = technologies.find((tech) => tech.name === techName);
        return techObject ? techObject : { name: techName, id: null };
      });

      setSelectedTechnologies(mappedTechObjects);
      setImage(project.image[0]);
      setPreviewSource(project.image[0])
    };
  }, [project]);

  const handleSetInput = (
    method: Dispatch<SetStateAction<string>>,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    method(event.target.value);
  };

  const handleMultiSelect = (selectedList: TechnologiesList) => {
    setSelectedTechnologies(selectedList);
  };

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const image: File = files[0];
      previewImage(image);
    }
  };

  const previewImage = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result !== null) {
        const result = reader.result as string;
        setPreviewSource(result);
      }
    };
  };

  const handleCreateProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const image = previewSource;

    try {
      let responseData;

      if (project) {
        const data = {
          ...project, 
          image,
          title,
          description,
          technologies: selectedTechnologies.map((tech) => tech.name),
          repository,
          linkedin,
        };
      
        responseData = await patchProject({ id: projectId, data });

      } else {
        if (!user) {
          return;
        }

        const data = {
          title,
          repository,
          description,
          linkedin,
          image,
          technologies: selectedTechnologies.map((tech) => tech.name),
          userId: user.id,
        };
      
        responseData = await addProject({ data });
      }

      if (error) {
        console.error('Błąd odpowiedzi:', error);
        setStatus('error');
      } else {
        setStatus('success');

        setTimeout(() => {
          if (projectId) {
            router.push(`/project/${projectId}`)
          } else {
            router.push('/portfolios')
          }
        }, 3000)
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania zapytania:', error);
    }
  };

  return (
    <main className="grid place-items-center min-h-screen relative mb-20">
      {!user ? (
        'loading'
      ) : (
        <section
          className="w-[90%] lg:w-[68%] px-[10px] md:px-[72px] xl:px-[100px] pt-[30px] lg:pt-[78px] pb-[64px] border-t-2 border-l-2 border-r-2 border-headline border-b-4 rounded-t-20 rounded-r-20 rounded-l-20 rounded-xl shadow-customShadow text-white"
        >
          <h1 className="text-center text-textSecondary text-[34px] font-bold">Create your project</h1>
          <form className="w-full mt-[50px]" onSubmit={handleCreateProject}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-widest text-gray-700 text-xs font-bold mb-2 text-textSecondary"
                  htmlFor="grid-title"
                >
                  Title
                </label>
                <input
                  className="appearance-none block w-full bg-secondary border-headline text-white border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder-gray text-textSecondary"
                  id="grid-title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => handleSetInput(setTitle, e)}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-widest text-gray-700 text-xs font-bold mb-2 text-textSecondary"
                  htmlFor="grid-repository"
                >
                  Repository
                </label>
                <input
                  className="appearance-none block w-full bg-secondary border-headline text-white border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder-gray text-textSecondary"
                  id="grid-repository"
                  type="text"
                  placeholder="Link"
                  value={repository}
                  onChange={(e) => handleSetInput(setRepository, e)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-widest text-gray-700 text-xs font-bold mb-2 text-textSecondary"
                  htmlFor="grid-description"
                >
                  Description
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 min-h-72"
                  id="grid-description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => handleSetInput(setDescription, e)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-between -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-textSecondary"
                  htmlFor="grid-city"
                >
                  Linkedin
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-5 md:mt-0 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 bg-secondary border-headline text-textSecondary"
                  id="grid-city"
                  type="text"
                  placeholder="linkedin"
                  value={linkedin}
                  onChange={(e) => handleSetInput(setLinkedin, e)}
                  required
                />
              </div>
              <div className="w-full md:w-1/3 px-3 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-textSecondary mt-5 md:mt-0"
                  htmlFor="grid-technologies"
                >
                  Technologies
                </label>
                <Multiselect
                  options={technologies}
                  selectedValues={selectedTechnologies}
                  onSelect={handleMultiSelect}
                  onRemove={handleMultiSelect}
                  displayValue="name"
                  className="bg-secondary rounded border-none outline-none mt-3"
                />
              </div>
              <div className="w-full md:w-1/3 px-3 md:mb-0">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 text-textSecondary mt-5 md:mt-0"
                  htmlFor="file_input"
                >
                  IMAGE
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-secondary dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 py-2 px-2 border-headline text-textSecondary"
                  id="file_input"
                  type="file"
                  onChange={handleInputImage}
                  required
                />
              </div>
            </div>
            <div className="flex w-full justify-end mt-10">
              <Button px={4} py={2} text={"Save"} type="submit" />
            </div>
            {previewSource && (
              <>
                <h6 className="text-textSecondary text-[24px] mt-[30px]">Image</h6>
                <Image
                  src={previewSource}
                  alt="preview"
                  width={500}
                  height={500}
                  className="mt-5"
                />
              </>
            )}
          </form>
        </section>
      )}
      {status === 'success' && <Modal text={"Succesfully added project"} type="success"  />}
    </main>
  );
};

export default CreateProject;

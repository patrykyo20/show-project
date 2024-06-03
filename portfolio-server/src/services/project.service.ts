import Project from "../models/project.model";
import getRandomId from "../utlis/getRandomId";

const get = async (
  page?: number,
  pagePerSize?: number,
  order?: string,
  sort?: string
) => {
  const queryOptions: any = {};

  if (page !== undefined && pagePerSize !== undefined) {
    queryOptions.limit = pagePerSize;
    queryOptions.offset = (page - 1) * pagePerSize;
  }

  if (order && sort) {
    queryOptions.order = [[sort, order]];
  }

  const allProjects = await Project.findAll(queryOptions);

  return allProjects;
};

const getLength = async () => {
  const length = await Project.count();

  return length;
};

const getOne = async (id: number) => {
  const oneProject = await Project.findByPk(id)

  return oneProject;
}

const getByUser = async (
  userId: string,
  page?: number,
  pagePerSize?: number,
  order?: string,
  sort?: string
) => {
  const queryOptions: any = {
    where: {
      userId: userId,
    },
  };

  if (page !== undefined && pagePerSize !== undefined) {
    queryOptions.limit = pagePerSize;
    queryOptions.offset = (page - 1) * pagePerSize;
  }

  if (order && sort) {
    const orderType = order === 'asc' ? 'desc' : 'asc';
    queryOptions.order = [[sort, orderType]];
  }

  const userProjects = await Project.findAll(queryOptions);

  return userProjects;
};

const create = async (
  image: string,
  title: string,
  description: string,
  technologies: string[],
  repository: string,
  linkedin: string,
  userId: string,
) => {
  const id = getRandomId();
  const likes: string = '{}';
  const visits = 0;
  const technologiesFormatted = technologies.join(', ');

  return Project.create({
    id,
    image: `{${image}}`,
    title,
    likes,
    visits,
    description,
    technologies: `{${technologiesFormatted}}`,
    repository,
    linkedin,
    userId,
  });
};

const update = async (
  id: number,
  image: string,
  title: string,
  likes: string[],
  visits: number,
  description: string,
  technologies: string[],
  repository: string,
  linkedin: string,
) => {
  const technologiesFormatted = technologies.join(', ');
  const formattedLikes = `{${likes}}`


  const formattedImage = `{${image}}`;

  await Project.update({
    title,
    image: formattedImage,
    likes: formattedLikes,
    visits,
    description,
    technologies: `{${technologiesFormatted}}`,
    repository,
    linkedin,
  }, { where: { id } });

  const updatedProject = await Project.findByPk(id);

  return updatedProject;
};


const remove = async (id: number) => {
  await Project.destroy({ where: { id }})
};

const projectService = {
  get,
  getLength,
  getOne,
  getByUser,
  create,
  update,
  remove,
};

export default projectService;
interface Project {
  id: number;
  image: string[]
  title: string;
  likes?: string[];
  visits?: number;
  description: string;
  technologies: string[];
  repository: string;
  linkedin: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default Project;
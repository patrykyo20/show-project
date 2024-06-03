import Comment from "../models/comment.model";
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

  const allComments = await Comment.findAll(queryOptions);

  return allComments;
};

const getLength = async () => {
  const length = await Comment.count();

  return length;
};

const getOne = async (id: number) => {
  const oneComment = await Comment.findByPk(id)

  return oneComment;
};

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

  const userComments = await Comment.findAll(queryOptions);

  return userComments;
};

const create = async (
  title: string,
  message: string,
  userId: string,
  author: string,
  authorImage: string,
) => {
  const id: number = getRandomId();
  const likes: string[] = [];
  const visits = 0;


  return Comment.create({
    id,
    title,
    message,
    likes,
    visits,
    userId,
    author,
    authorImage,
  });
};

const update = async (
  id: number,
  title: string,
  message: string,
  likes: string[],
  visits: number,
  author: string,
  authorImage: string,
) => {

  await Comment.update({
    id,
    title,
    message,
    likes,
    visits,
    author,
    authorImage,
  }, { where: { id } });

  const updatedComment = await Comment.findByPk(id);

  return updatedComment;
};


const remove = async (id: number) => {
  await Comment.destroy({ where: { id }})
};

const commentService = {
  get,
  getLength,
  getOne,
  getByUser,
  create,
  update,
  remove,
};

export default commentService;
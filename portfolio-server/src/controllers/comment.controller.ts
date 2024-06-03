import commentService from "../services/comment.service";
import ControllerAction from "../types/controllerAction";
import cloudinary from "../utlis/cloudinary";

const getAllComments: ControllerAction = async (req, res) => {
  try {
    const { page, pagePerSize, order, sort } = req.query;

    const pageNumber = page ? parseInt(page as string, 10) : undefined;
    const pagePerSizeNumber = pagePerSize ? parseInt(pagePerSize as string, 10) : undefined;

    const allComments = await commentService.get(
      pageNumber,
      pagePerSizeNumber,
      order as string,
      sort as string
    );

    if (!allComments) {
      res.status(404).send('Not Found: The specified entity does not exist');
      return;
    }

    res.send(allComments);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

const getCommentsLength: ControllerAction = async (req, res) => {
  try {
    const CommentLength = await commentService.getLength();

    res.json({ length: CommentLength });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const getOneComment: ControllerAction = async (req, res) => {
  try {
    const { id } = req.params;

    const Comment = await commentService.getOne(+id);
    
    res.status(201);
    res.send(Comment);
  } catch (error) {
    console.log(error);
  };
};

const getUserComments: ControllerAction = async (req, res) => {
  try {
    const { userId } = req.params
    const { page, pagePerSize, order, sort } = req.query;

    const pageNumber = page ? parseInt(page as string, 10) : undefined;
    const pagePerSizeNumber = pagePerSize ? parseInt(pagePerSize as string, 10) : undefined;

    const Comments = await commentService.getByUser(
      userId,
      pageNumber,
      pagePerSizeNumber,
      order as string,
      sort as string
    );

    res.status(201);
    res.send(Comments)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Wystąpił błąd podczas pobierania projektów użytkownika." });
  }
}

const postComment: ControllerAction = async (req, res) => {
  try {
    const { title, message, userId, author, authorImage } = req.body;

    if (!message || !userId || !author || !authorImage) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const uploadedResponse = await cloudinary.v2.uploader.upload(authorImage, {
      upload_preset: 'dev_setups',
    });

    const newComment = await commentService.create(
      title,
      message,
      userId,
      author,
      uploadedResponse.secure_url,
    );

    res.status(201).send(newComment);
  } catch (error) {
    console.error('Błąd podczas tworzenia projektu:', error);
    res.status(500).send('Wewnętrzny błąd serwera');
  }
};

const patchComment: ControllerAction = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      message,
      likes,
      visits,
      author,
      authorImage
    } = req.body;

    const updateComment = await commentService.update(
      +id,
      title,
      message,
      likes,
      visits,
      author,
      authorImage
    );


    res.status(201);
    res.send(updateComment);
  } catch (error) {
    console.log(error);
  };
};

const deleteComment: ControllerAction = async (req, res) => {
  try {
    const { id } = req.params;

    await commentService.remove(+id);

    res.sendStatus(204);
    res.send("Comment was deleted");
  } catch (error) {
    console.log(error);
  };
};

const commentController = {
  getAllComments,
  getCommentsLength,
  getOneComment,
  getUserComments,
  postComment,
  patchComment,
  deleteComment
};

export default commentController;
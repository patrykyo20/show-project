interface Message {
  id: number;
  title: string;
  message: string;
  likes?: string[];
  visits?: number;
  userId: string;
  author: string;
  authorImage: string;
}

export default Message;



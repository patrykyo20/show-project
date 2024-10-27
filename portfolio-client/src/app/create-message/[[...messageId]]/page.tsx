"use client";

import { useUser } from "@clerk/nextjs";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import Button from "@/components/button";
import {
  useAddMessageMutation,
  useGetMessageQuery,
  usePatchMessageMutation,
} from "@/lib/slices/projects/messagesApi";
import Modal from "@/app/components/Modal";
import { useRouter } from "next/navigation";

const CreateMessage = ({ params }: { params: { messageId: number } }) => {
  const { user } = useUser();
  const router = useRouter();

  const messageId = params.messageId;
  const { data: message, error } = useGetMessageQuery({ id: messageId });

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [previewSource, setPreviewSource] = useState<string>("");

  const [status, setStatus] = useState<string>("");

  const [addMessage] = useAddMessageMutation();
  const [patchMessage] = usePatchMessageMutation();

  useMemo(() => {
    if (message) {
      setTitle(message.title);
      setText(message.message);
    }
  }, [message]);

  const handleSetInput = (
    method: Dispatch<SetStateAction<string>>,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    method(event.target.value);
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

  const handleCreateMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let responseData;

      if (message) {
        const data = {
          ...message,
          title,
          message: text,
        };

        responseData = await patchMessage({ id: messageId, data });
      } else {
        if (!user) {
          return;
        }

        const data = {
          title,
          message: text,
          userId: user.id,
          author: user.fullName ?? "Unknown Author",
          authorImage: user.imageUrl,
        };

        responseData = await addMessage({ data });
      }

      if (error) {
        console.error(error);
        setStatus("error");
      } else {
        setStatus("success");

        setTimeout(() => {
          if (messageId) {
            router.push(`/message/${messageId}`);
          } else {
            router.push("/messages");
          }
        }, 3000);
      }
    } catch (error) {
      console.error("Błąd podczas wysyłania zapytania:", error);
    }
  };

  return (
    <main className="grid place-items-center min-h-screen relative mb-20">
      {!user ? (
        "loading"
      ) : (
        <section className="w-[90%] lg:w-[68%] px-[10px] md:px-[72px] xl:px-[100px] pt-[30px] lg:pt-[78px] pb-[64px] border-t-2 border-l-2 border-r-2 border-headline border-b-4 rounded-t-20 rounded-r-20 rounded-l-20 rounded-xl shadow-customShadow text-white">
          <h1 className="text-center text-textSecondary text-[34px] font-bold">
            Create your message
          </h1>
          <form className="w-full mt-[50px]" onSubmit={handleCreateMessage}>
            <div className="flex flex-wrap -mx-3 mb-6 px-3">
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
            <div className="flex flex-wrap -mx-3 mb-6 px-3">
              <div className="w-full">
                <label
                  className="block uppercase tracking-widest text-gray-700 text-xs font-bold mb-2 text-textSecondary"
                  htmlFor="grid-message"
                >
                  Message
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 min-h-72"
                  id="grid-message"
                  placeholder="Message"
                  value={text}
                  onChange={(e) => handleSetInput(setText, e)}
                  required
                />
              </div>
            </div>

            <div className="flex w-full justify-end mt-10">
              <Button px={4} py={2} text={"Save"} type="submit" />
            </div>
          </form>
        </section>
      )}
      {status === "success" && (
        <Modal text={"Succesfully added message"} type="success" />
      )}
    </main>
  );
};

export default CreateMessage;

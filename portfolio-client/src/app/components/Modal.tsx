import Image from "next/image";
import { FC } from "react";

interface ModalProps {
  text: string;
  type: string;
}

const Modal: FC<ModalProps> = ({text, type}) => {
  return (
    <div id="successModal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed bottom-0 right-0 left-0 z-50
      justify-center items-center">
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 bg-success">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                <Image 
                  src={'/success-mark.svg'}
                  alt="success-mark"
                  width={36}
                  height={36}
                />
              <span className="sr-only">Success</span>
              </div>
              <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white text-textSecondary">{text}</p>
          </div>
      </div>
  </div>
  );
};

export default Modal;
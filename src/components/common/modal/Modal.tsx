import { AiOutlineClose } from "react-icons/ai";
import { useState, forwardRef, useImperativeHandle, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface IProps {
  title?: string;
  children: ReactNode;
  footerData?: ReactNode | ReactNode[];
  overflow?: boolean;
}

export interface ModalRef {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<ModalRef, IProps>(function ModalComponent({ title = "My Modal", children, footerData, overflow }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRootRef = useRef<HTMLElement | null>(null);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  // ایجاد یک عنصر جداگانه برای مودال در زمان کلاینت ساید
  useEffect(() => {
    if (typeof document !== "undefined") {
      modalRootRef.current = document.createElement("div");
      document.body.appendChild(modalRootRef.current);
    }
    return () => {
      if (modalRootRef.current) {
        document.body.removeChild(modalRootRef.current);
      }
    };
  }, []);

  if (!isOpen || !modalRootRef.current) {
    return null;
  }

  return createPortal(
    <div className="fixed w-screen h-screen bg-black bg-opacity-60 top-0 left-0 z-50 flex justify-center items-center" onClick={() => setIsOpen(false)}>
      <div className={`w-full max-w-screen-md mx-3 min-h-[200px] bg-white rounded-xl p-4 flex flex-col relative ${overflow ? "overflow-y-auto" : ""}`} onClick={(event) => event.stopPropagation()}>
        <AiOutlineClose className="absolute left-4 top-3 text-2xl text-red-600 cursor-pointer" onClick={() => setIsOpen(false)} />
        <div className="w-full h-10 flex items-center mb-2 border-b border-gray-300">
          <h1 className="text-lg text-gray-700 font-bold">{title}</h1>
        </div>
        {children}
        {footerData && <div className="w-full flex items-center justify-center py-3 mt-5 border-t border-gray-300">{footerData}</div>}
      </div>
    </div>,
    modalRootRef.current
  );
});

Modal.displayName = "Modal"; // اضافه کردن displayName به طور صریح

export default Modal;

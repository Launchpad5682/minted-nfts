import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

// types
import { ModalProps } from "./types";
import { FunctionComponent, useEffect } from "react";

// icons
import Icon from "react-icons-kit";
import { ic_close } from "react-icons-kit/md/ic_close";

const Modal: FunctionComponent<ModalProps> = (props: ModalProps) => {
  const { visible, onClose, layoutId, initialPosition, children } = props;

  useEffect(() => {
    const handleKeyDown = (event: { keyCode: number }) => {
      if (event.keyCode === 27) {
        // "Escape" key (Esc) was pressed
        // close modal when esc key is pressed
        onClose();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (visible)
    return (
      <AnimatePresence>
        <motion.div
          className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gray-900 bg-opacity-40 p-8"
          onClick={onClose}
          initial={{ backdropFilter: "blur(0px)" }}
          animate={{ backdropFilter: "blur(20px)" }}
          exit={{ backdropFilter: "blur(0px)" }}
        >
          <motion.div
            className="absolute aspect-square max-h-fit w-3/5 max-w-lg rounded-md bg-slate-800"
            onClick={(e) => {
              e.stopPropagation();
            }}
            initial={{
              opacity: 0,
              scale: 0,
              top: initialPosition.top,
              left: initialPosition.left,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              top: "auto",
              bottom: "auto",
              right: "auto",
              left: "auto",
            }}
            exit={{
              opacity: 0,
              scale: 0,
              left: initialPosition.left,
              top: initialPosition.top,
            }}
            layoutId={layoutId}
          >
            <>
              <span
                className="text-md ml-auto flex h-2 w-2 items-center justify-center rounded-full p-5 hover:bg-slate-600"
                onClick={onClose}
              >
                <Icon icon={ic_close} size={24} />
              </span>
              {children}
            </>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );

  return null;
};

export { Modal };

import { FunctionComponent, RefObject, useRef } from "react";
import { motion } from "framer-motion";
import { CardProps } from "./types";
import Image from "next/image";

const colors = [
  "bg-red-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-pink-400",
  "bg-orange-400",
  "bg-teal-400",
  "bg-sky-400",
];

const Card: FunctionComponent<CardProps> = (props: CardProps) => {
  const { cardItem, clickHandler, layoutId, setContext } = props;

  const {
    rawMetadata = {},
    media = [],
    tokenId,
    title,
    metadataError,
  } = cardItem;
  const image = rawMetadata.image || media ? media[0]?.thumbnail : "" || "";

  const ref: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const bgColor = image
    ? "bg-slate-800"
    : colors[Math.floor(Number(tokenId) % 7)];

  const onClickCard = () => {
    const element = ref.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      const fixedPosition = {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset,
      };
      setContext(fixedPosition, cardItem);
    }

    clickHandler(layoutId);
  };

  return (
    <motion.div
      layoutId={layoutId}
      className={`flex h-52 w-52 cursor-pointer items-center justify-center rounded-md ${bgColor} lg:h-64 lg:w-64`}
      onClick={onClickCard}
      whileHover={{ scale: 1.1 }}
      ref={ref}
    >
      {image ? (
        <Image
          width={200}
          height={200}
          src={image}
          className="h-full w-full rounded-md"
          alt={""}
        />
      ) : (
        <p
          className={`break-all p-4 text-center text-lg ${
            metadataError ? "text-red-600" : "text-neutral-800"
          }`}
        >
          {metadataError ? metadataError : title}
        </p>
      )}
    </motion.div>
  );
};

export { Card };

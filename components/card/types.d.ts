import { Nft } from "alchemy-sdk";
import { Position } from "../modal/types";

interface CardProps {
  cardItem: Nft;
  layoutId: string;
  clickHandler: (id: string) => void;
  setPosition: (position: Position) => void;
}

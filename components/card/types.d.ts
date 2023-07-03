import { Nft } from "alchemy-sdk";
import { Position } from "../modal/types";

interface CardProps {
  cardItem: Nft;
  layoutId: string;
  clickHandler: (id: string) => void;
  setContext: (position: Position, nft: Nft) => void;
}

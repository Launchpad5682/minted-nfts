import { ReactNode } from "react";

export interface Position {
  top: number;
  left: number;
}

interface ModalProps {
  visible?: boolean;
  onClose: () => void;
  children: ReactNode;
  /**
   * initalPosition: takes top and left of the card
   */
  initialPosition: Position;
  /**
   * layoutId: identifier for animation
   */
  layoutId: string;
}

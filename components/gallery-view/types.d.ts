import { Nft } from "alchemy-sdk";

interface GalleryViewProps {
  listItems?: Array<Nft>;
  loadMoreItems: () => void;
  loadingMore: boolean;
  isItemLoaded: (index: number) => boolean;
}

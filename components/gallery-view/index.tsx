import { FunctionComponent, useState } from "react";

// components
import { Card } from "../card";
import { Modal } from "../modal";

// types
import { Position } from "../modal/types";
import { Nft } from "alchemy-sdk";
import { GalleryViewProps } from "./types";
import { NftDetails } from "../nft-details";

const GalleryView: FunctionComponent<GalleryViewProps> = (
  props: GalleryViewProps
) => {
  const { listItems = [] } = props;
  const [modal, setModal] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>();

  const [activeContext, setActiveContext] = useState<{
    position: Position;
    nft: Nft;
  }>();

  const clickHandler = (id: string) => {
    setModal(true);
    setSelectedId(id);
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="mx-auto grid max-w-fit grid-cols-1 flex-wrap gap-8 md:grid-cols-3 lg:grid-cols-4">
        {listItems.map((listItem: Nft, _) => (
          <Card
            layoutId={String(_)}
            key={_}
            cardItem={listItem}
            clickHandler={clickHandler}
            setContext={(position: Position, nft: Nft) =>
              setActiveContext({ position, nft })
            }
          />
        ))}
      </div>
      {selectedId && Number(selectedId) >= 0 && activeContext?.position && (
        <Modal
          layoutId={selectedId}
          visible={modal}
          onClose={() => {
            setModal(false);
            setSelectedId(null);
          }}
          initialPosition={activeContext.position}
        >
          <NftDetails nft={activeContext.nft} />
        </Modal>
      )}
    </div>
  );
};

export { GalleryView };

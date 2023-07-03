import { FunctionComponent, useRef, useState } from "react";

// components
import { Card } from "../card";
import { Modal } from "../modal";

// types
import { Position } from "../modal/types";
import { Nft } from "alchemy-sdk";
import { GalleryViewProps } from "./types";
import { NftDetails } from "../nft-details";

import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

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

  const gridRef = useRef(null);

  const columnCount = 4;

  const clickHandler = (id: string) => {
    setModal(true);
    setSelectedId(id);
  };

  const card = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;

    if (index >= listItems.length) {
      return null; // Return null if index is out of bounds
    }

    return (
      <div style={style}>
        <Card
          layoutId={String(index)}
          key={listItems[index].tokenId}
          cardItem={listItems[index]}
          clickHandler={clickHandler}
          setContext={(position: Position, nft: Nft) =>
            setActiveContext({ position, nft })
          }
        />
      </div>
    );
  };

  return (
    <div className="flex h-full max-h-full w-full overflow-y-auto">
      <AutoSizer>
        {({ height, width }) => {
          console.log(height, width, "hw");
          const columnWidth = Math.ceil(width / 4);
          return (
            <Grid
              columnCount={columnCount}
              rowCount={Math.ceil(listItems.length / columnCount)}
              columnWidth={columnWidth}
              rowHeight={300}
              height={height}
              width={width}
              onScroll={(e) => {
                if (gridRef.current) {
                  const { scrollTop, scrollHeight, clientHeight } =
                    gridRef.current;
                  const isAtEnd = scrollTop + clientHeight === scrollHeight;

                  if (isAtEnd) {
                    // Grid has reached the end
                    console.log("Reached end of grid");
                  }
                }
              }}
              ref={gridRef}
            >
              {card}
            </Grid>
          );
        }}
      </AutoSizer>

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

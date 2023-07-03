"use client";
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
import InfiniteLoader from "react-window-infinite-loader";
import { Loader } from "../loader";

const GalleryView: FunctionComponent<GalleryViewProps> = (
  props: GalleryViewProps
) => {
  const { listItems = [], loadMoreItems, loadingMore, isItemLoaded } = props;
  const [modal, setModal] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>();

  const [activeContext, setActiveContext] = useState<{
    position: Position;
    nft: Nft;
  }>();

  const gridRef = useRef(null);

  const columnCount = 4;
  const itemCount = 1000;

  const clickHandler = (id: string) => {
    setModal(true);
    setSelectedId(id);
  };

  const card = ({ columnIndex, rowIndex, style }: any) => {
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

  // const isItemLoaded = (index: number): boolean => {
  //   const bool = index < listItems.length;
  //   console.log(bool, index, "render item loaded");

  //   return bool;
  // };

  return (
    <div className="flex h-full max-h-full w-full flex-col overflow-y-auto">
      <div style={{ flex: "1 1 auto" }}>
        <InfiniteLoader
          itemCount={listItems.length + 1}
          isItemLoaded={isItemLoaded}
          loadMoreItems={(startIndex, stopIndex) => loadMoreItems()}
        >
          {({ onItemsRendered }: any) => {
            return (
              <AutoSizer>
                {({ height, width }) => {
                  // const height = 660;
                  // const width = 1376;

                  const columnWidth = Math.ceil(width / 4);
                  const rowCount = Math.ceil(listItems.length / columnCount);

                  return (
                    <Grid
                      columnCount={columnCount}
                      rowCount={rowCount}
                      columnWidth={columnWidth}
                      rowHeight={columnWidth}
                      height={height}
                      width={width}
                      // onItemsRendered={onItemsRendered}
                      onItemsRendered={(props) => {
                        // props.setScrollRowAndColumn(
                        //   visibleRowStartIndex,
                        //   visibleColumnStartIndex
                        // );
                        onItemsRendered({
                          overscanStartIndex: props.overscanRowStartIndex,
                          overscanStopIndex: props.overscanRowStopIndex,
                          visibleStartIndex: props.visibleRowStartIndex,
                          visibleStopIndex: props.visibleRowStopIndex,
                        });
                      }}
                    >
                      {card}
                    </Grid>
                  );
                }}
              </AutoSizer>
            );
          }}
        </InfiniteLoader>
      </div>
      <Loader visible={loadingMore} />

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

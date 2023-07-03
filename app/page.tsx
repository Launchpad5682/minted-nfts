"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { getAllNFTs } from "../utils/get-all-nfts";
import { useEffect, useState } from "react";
import { GalleryView } from "@/components/gallery-view";
import { Nft } from "alchemy-sdk";
import { Loader } from "@/components/loader";

const App = () => {
  const { isConnected } = useAccount();

  const pageSize = 12;
  const [pageKey, setPageKey] = useState<string>();
  const [nextPageKey, setNextPageKey] = useState<string>();
  const [nfts, setNfts] = useState<Array<Nft>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected) {
      (async () => {
        try {
          setLoading(true);
          const data = await getAllNFTs(
            "0xFe88444bf2dd671cdfC2FDab8c6642df3d2E3970",
            pageSize,
            pageKey
          );

          // console.log(data);

          setNfts((prev: Array<Nft>) => [...prev, ...data.nfts]);
          console.log(pageKey, "using this key");
          setNextPageKey(data.pageKey);
          console.log(data.pageKey, "returned key");
          setPageKey(undefined);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      })();
    }
  }, [pageKey, isConnected]);

  return (
    <div
      className={`flex h-screen min-h-screen w-full flex-col bg-gray-950 ${
        isConnected ? "gap-8" : "items-center justify-center"
      } p-8`}
    >
      <div className={`${isConnected ? "ml-auto" : ""}`}>
        <ConnectButton />
      </div>
      {isConnected && !loading ? (
        <GalleryView
          listItems={nfts}
          loadMoreItems={() => {
            setPageKey(nextPageKey);
            console.log(nextPageKey, "load more details");
          }}
          loadingMore={loading && pageKey}
          isItemLoaded={(index: number): boolean => {
            // const bool = index < nfts.length || !Boolean(nextPageKey);
            // console.log(bool, index, nfts.length, "items loaded");
            // return bool;

            const bool = !!nfts[index];

            return bool;
          }}
        />
      ) : null}
      <Loader visible={loading && !pageKey} absolute />
    </div>
  );
};

export default App;

"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { getAllNFTs } from "../utils/get-all-nfts";
import { useEffect, useState } from "react";
import { GalleryView } from "@/components/gallery-view";
import { Nft } from "alchemy-sdk";
import { Loader } from "@/components/loader";

// icons
import { ic_keyboard_arrow_left } from "react-icons-kit/md/ic_keyboard_arrow_left";
import { ic_keyboard_arrow_right } from "react-icons-kit/md/ic_keyboard_arrow_right";
import Icon from "react-icons-kit";

const App = () => {
  const { isConnected } = useAccount();

  const pageSize = 100;
  const [pageKeys, setPageKeys] = useState<Array<string>>([]);
  const [activePage, setActivePage] = useState(-1);
  const [nfts, setNfts] = useState<Array<Nft>>();
  const [loading, setLoading] = useState(false);
  const [fetchNfts, setFetchNfts] = useState(true);

  useEffect(() => {
    if (isConnected && fetchNfts) {
      (async () => {
        try {
          setLoading(true);

          const pageKey = activePage > -1 ? pageKeys[activePage] : undefined;
          const data = await getAllNFTs(
            "0xFe88444bf2dd671cdfC2FDab8c6642df3d2E3970",
            pageSize,
            pageKey
          );

          setNfts(data.nfts);
          setPageKeys((prev) =>
            data.pageKey ? [...prev, data.pageKey] : prev
          );
          setFetchNfts(false);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      })();
    }
  }, [activePage, fetchNfts, isConnected, pageKeys]);

  const disabledPrev = activePage < 0;
  const disabledNext = activePage + 1 >= pageKeys.length;

  return (
    <div
      className={`flex h-screen min-h-screen w-full flex-col bg-gray-950 ${
        isConnected ? "gap-8" : "items-center justify-center"
      } p-8`}
    >
      <div
        className={`${isConnected ? "ml-auto flex items-center gap-8" : ""}`}
      >
        {!loading ? <p>Showing {nfts?.length ?? 0} nfts</p> : null}
        <button
          className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-gray-800 p-4 ${
            !disabledPrev ? "hover:bg-gray-700" : ""
          }`}
          onClick={() => {
            setActivePage((prev) => prev - 1);
            setFetchNfts(true);
          }}
          disabled={disabledPrev}
        >
          <Icon icon={ic_keyboard_arrow_left} size={24} />
        </button>
        <button
          className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-gray-800 p-4 ${
            !disabledNext ? "hover:bg-gray-700" : ""
          }`}
          onClick={() => {
            setActivePage((prev) => prev + 1);
            setFetchNfts(true);
          }}
          disabled={disabledNext}
        >
          <Icon icon={ic_keyboard_arrow_right} size={24} />
        </button>
        <ConnectButton />
      </div>
      {isConnected && !loading ? <GalleryView listItems={nfts} /> : null}
      <Loader visible={loading} absolute />
    </div>
  );
};

export default App;

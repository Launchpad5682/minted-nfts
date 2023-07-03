import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(config);

const getAllNFTs = (
  contractAddress: string,
  pageSize?: number,
  pageKey?: string
) =>
  alchemy.nft.getNftsForContract(contractAddress, {
    pageSize: pageSize ?? 10,
    pageKey: pageKey,
    omitMetadata: false,
  });

export { getAllNFTs, alchemy };

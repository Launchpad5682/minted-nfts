import { alchemy } from "../setup-alchemy";

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

export { getAllNFTs };

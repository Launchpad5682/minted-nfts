import { alchemy } from "../setup-alchemy";

const getOwnersForNft = (contractAddress: string, tokenId: string) =>
  alchemy.nft.getOwnersForNft(contractAddress, tokenId);

export { getOwnersForNft };

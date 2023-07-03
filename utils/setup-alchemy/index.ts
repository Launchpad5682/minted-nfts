import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(config);

export { alchemy };

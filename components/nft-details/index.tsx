import { getOwnersForNft } from "@/utils/get-owners-for-nft";
import { FunctionComponent, useEffect, useState } from "react";
import { NftDetailsProps } from "./types";
import { Loader } from "../loader";
import Link from "next/link";
import Image from "next/image";

const NftDetails: FunctionComponent<NftDetailsProps> = (
  props: NftDetailsProps
) => {
  const { nft } = props;
  const { tokenId, rawMetadata = {} } = nft;

  const { name, description, image, external_url } = rawMetadata;

  const [owners, setOwners] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getOwnersForNft(
          "0xFe88444bf2dd671cdfC2FDab8c6642df3d2E3970",
          tokenId
        );
        setOwners(data.owners.join(", "));
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, [tokenId]);

  return (
    <div className="flex h-full w-full flex-col overflow-auto p-4 gap-4 break-all">
      {!loading ? (
        <>
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold">Owner(s):</span>
            <p>{owners}</p>
          </div>
          {name || description || image || external_url ? (
            <>
              {name ? (
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-bold">Name:</span>
                  <p>{name}</p>
                </div>
              ) : null}
              {description ? (
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-bold">Description:</span>
                  <p>{description}</p>
                </div>
              ) : null}
              {external_url ? (
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-bold">External URL:</span>
                  <Link href={external_url} target="_blank">
                    {external_url}
                  </Link>
                </div>
              ) : null}
              {image ? (
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-bold">Image:</span>
                  <Image src={image} width={100} height={100} alt="image" />
                </div>
              ) : null}
            </>
          ) : (
            <p>No Meta Data found</p>
          )}
        </>
      ) : null}
      <Loader visible={loading} absolute />
    </div>
  );
};

export { NftDetails };

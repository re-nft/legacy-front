import React, { useMemo, useCallback } from "react";
import { Nft } from "../../types/classes";
import { CatalogueItemRow } from "./catalogue-item-row";
import { Checkbox } from "../common/checkbox";
import { Skeleton } from "./skeleton";
import { CatalogueItemDisplay } from "./catalogue-item-display";

import { useRouter } from "next/router";
import { useNftMetaState } from "../../hooks/queries/useMetaState";
import shallow from "zustand/shallow";
import { CopyLink } from "../copy-link";
import { ShortenPopover } from "../common/shorten-popover";
import { CatalogueActions } from "./catalogue-actions";
import { useWallet } from "../../hooks/useWallet";

export type CatalogueItemProps = {
  nft: Nft;
  checked?: boolean;
  isAlreadyFavourited?: boolean;
  onCheckboxChange: () => void;
  disabled?: boolean;
};

//TODO:eniko make this component accept nId instead of Nft
export const CatalogueItem: React.FC<CatalogueItemProps> = ({
  nft,
  checked,
  onCheckboxChange,
  children,
  disabled
}) => {
  const { signer } = useWallet();
  const { pathname } = useRouter();

  const meta = useNftMetaState(
    useCallback(
      (state) => {
        return state.metas[nft.nId] || {};
      },
      [nft.nId]
    ),
    shallow
  );

  const imageIsReady = useMemo(() => {
    return meta && !meta.loading;
  }, [meta]);

  const { name, image, description, openseaLink } = meta;

  const isRentPage = useMemo(() => {
    return pathname === "/" || pathname.includes("/rent");
  }, [pathname]);

  const shouldFlip = useCallback((prev, current) => {
    if (prev.type !== current.type) {
      return true;
    }
    return false;
  }, []);

  const knownContract = useMemo(() => {
    return (
      nft.nftAddress.toLowerCase() ===
      "0x0db8c099b426677f575d512874d45a767e9acc3c"
    );
  }, [nft.nftAddress]);

  return (
    <div
      key={nft.id}
      className={`text-base leading-tight flex flex-col bg-white border-4 border-black hover:shadow-rn-one pb-1 ${
        checked ? "shadow-rn-one" : ""
      }`}
      data-item-id={nft.tokenId}
    >
      {!imageIsReady && <Skeleton />}
      {imageIsReady && (
        <>
          <>
            <div className="flex justify-center space-x-2">
              <a
                className="flex-initial"
                target="_blank"
                rel="noreferrer"
                href={`https://rarible.com/token/${nft.nftAddress}:${nft.tokenId}`}
              >
                <img src="/assets/rarible.png" className="nft__icon" />
              </a>
              {openseaLink && (
                <a
                  className="flex-initial"
                  target="_blank"
                  rel="noreferrer"
                  href={openseaLink}
                >
                  <img src="/assets/opensea.png" className="nft__icon" />
                </a>
              )}
              <CatalogueActions
                address={nft.nftAddress}
                tokenId={nft.tokenId}
              />
              <div className="flex-1 flex justify-end justify-self-end">
                <Checkbox
                  checked={!!checked}
                  onChange={onCheckboxChange}
                  disabled={disabled || !signer}
                ></Checkbox>
              </div>
            </div>
            <CatalogueItemDisplay image={image} description={description} />
            <div className="font-display text-xs leading-tight text-center py-3 px-4 flex flex-col justify-center items-center">
              <p className="flex-initial">{name}</p>
              <div className="flex flex-auto flex-row">
                {knownContract && (
                  <a
                    className="flex-initial p-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="/assets/nft-verified.png"
                      className="nft__icon small"
                    />
                  </a>
                )}
                {isRentPage && (
                  <CopyLink address={nft.nftAddress} tokenId={nft.tokenId} />
                )}
              </div>
            </div>
          </>

          <div className="px-2 flex flex-auto flex-col">
            <CatalogueItemRow
              text="NFT Address"
              value={<ShortenPopover longString={nft.nftAddress} />}
            />
            <CatalogueItemRow
              text="Token id"
              value={<ShortenPopover longString={nft.tokenId} />}
            />
            <CatalogueItemRow
              text="Standard"
              value={nft.isERC721 ? "721" : "1155"}
            />

            {children}
          </div>
        </>
      )}
    </div>
  );
};

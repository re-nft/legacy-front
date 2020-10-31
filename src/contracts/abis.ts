import face from "./abis/goerli/GanFaceNft.json";
import rent from "./abis/goerli/RentNft.json";
import erc20 from "./abis/ERC20.json";

export const abis = {
  erc20,
  goerli: {
    face,
    rent,
  },
};
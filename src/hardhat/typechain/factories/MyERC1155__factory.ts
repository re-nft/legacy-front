/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { MyERC1155 } from "../MyERC1155";

export class MyERC1155__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<MyERC1155> {
    return super.deploy(overrides || {}) as Promise<MyERC1155>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MyERC1155 {
    return super.attach(address) as MyERC1155;
  }
  connect(signer: Signer): MyERC1155__factory {
    return super.connect(signer) as MyERC1155__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MyERC1155 {
    return new Contract(address, _abi, signerOrProvider) as MyERC1155;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [],
    name: "GOLD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SHIELD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SILVER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SWORD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "THORS_HAMMER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "award",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405180606001604052806023815260200162002003602391396200003e6301ffc9a760e01b62000196565b62000049816200021b565b6200005b636cdb3d1360e11b62000196565b6200006d6303a24d0760e21b62000196565b50620000a873f39fd6e51aad88f6f4ce6ab8827279cfffb922666103e86001604051806020016040528060008152506200023460201b60201c565b620000e273f39fd6e51aad88f6f4ce6ab8827279cfffb922666103e96001604051806020016040528060008152506200023460201b60201c565b6200011c7370997970c51812dc3a010c7d01b50e0d17dc79c86103ea6001604051806020016040528060008152506200023460201b60201c565b62000156733c44cdddb6a900fa2b585dd299e03d12fa4293bc6103eb6001604051806020016040528060008152506200023460201b60201c565b62000190733c44cdddb6a900fa2b585dd299e03d12fa4293bc6103ec6002604051806020016040528060008152506200023460201b60201c565b620007e0565b6001600160e01b03198082161415620001f6576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152602081905260409020805460ff19166001179055565b8051620002309060039060208401906200067e565b5050565b6001600160a01b0384166200027b5760405162461bcd60e51b8152600401808060200182810382526021815260200180620020266021913960400191505060405180910390fd5b60006200028762000363565b9050620002ae816000876200029c8862000368565b620002a78862000368565b87620003ae565b60008481526001602090815260408083206001600160a01b0389168452825290912054620002e791859062000ecb620003b6821b17901c565b60008581526001602090815260408083206001600160a01b03808b16808652918452828520959095558151898152928301889052815190948616927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292908290030190a46200035c8160008787878762000418565b5050505050565b335b90565b604080516001808252818301909252606091600091906020808301908036833701905050905082816000815181106200039d57fe5b602090810291909101015292915050565b505050505050565b60008282018381101562000411576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b62000437846001600160a01b03166200067860201b62000f2c1760201c565b15620003ae57836001600160a01b031663f23a6e6187878686866040518663ffffffff1660e01b815260040180866001600160a01b03168152602001856001600160a01b0316815260200184815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015620004c9578181015183820152602001620004af565b50505050905090810190601f168015620004f75780820380516001836020036101000a031916815260200191505b509650505050505050602060405180830381600087803b1580156200051b57600080fd5b505af19250505080156200054257506040513d60208110156200053d57600080fd5b505160015b6200061e576200055162000730565b806200055e5750620005e6565b8060405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015620005aa57818101518382015260200162000590565b50505050905090810190601f168015620005d85780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b60405162461bcd60e51b815260040180806020018281038252603481526020018062001fa76034913960400191505060405180910390fd5b6001600160e01b0319811663f23a6e6160e01b146200066f5760405162461bcd60e51b815260040180806020018281038252602881526020018062001fdb6028913960400191505060405180910390fd5b50505050505050565b3b151590565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620006b6576000855562000701565b82601f10620006d157805160ff191683800117855562000701565b8280016001018555821562000701579182015b8281111562000701578251825591602001919060010190620006e4565b506200070f92915062000713565b5090565b5b808211156200070f576000815560010162000714565b60e01c90565b600060443d1015620007425762000365565b600481823e6308c379a06200075882516200072a565b14620007645762000365565b6040513d600319016004823e80513d6001600160401b03808311602484018310171562000795575050505062000365565b82840192508251915080821115620007b1575050505062000365565b503d83016020828401011115620007cb5750505062000365565b601f01601f1916810160200160405291505090565b6117b780620007f06000396000f3fe608060405234801561001057600080fd5b50600436106100e95760003560e01c80634e1273f41161008c578063d562e20411610066578063d562e2041461057d578063e3e55f0814610585578063e985e9c51461058d578063f242432a146105bb576100e9565b80634e1273f4146103d45780635b2725ed14610547578063a22cb4651461054f576100e9565b806313dc989f116100c857806313dc989f146101f95780632eb2c2d6146102015780633e4bee38146103c457806341a494c5146103cc576100e9565b8062fdd58e146100ee57806301ffc9a71461012c5780630e89341c14610167575b600080fd5b61011a6004803603604081101561010457600080fd5b506001600160a01b038135169060200135610684565b60408051918252519081900360200190f35b6101536004803603602081101561014257600080fd5b50356001600160e01b0319166106f3565b604080519115158252519081900360200190f35b6101846004803603602081101561017d57600080fd5b5035610712565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101be5781810151838201526020016101a6565b50505050905090810190601f1680156101eb5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61011a6107aa565b6103c2600480360360a081101561021757600080fd5b6001600160a01b038235811692602081013590911691810190606081016040820135600160201b81111561024a57600080fd5b82018360208201111561025c57600080fd5b803590602001918460208302840111600160201b8311171561027d57600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b8111156102cc57600080fd5b8201836020820111156102de57600080fd5b803590602001918460208302840111600160201b831117156102ff57600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561034e57600080fd5b82018360208201111561036057600080fd5b803590602001918460018302840111600160201b8311171561038157600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295506107b0945050505050565b005b61011a610aae565b61011a610ab4565b6104f7600480360360408110156103ea57600080fd5b810190602081018135600160201b81111561040457600080fd5b82018360208201111561041657600080fd5b803590602001918460208302840111600160201b8311171561043757600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b81111561048657600080fd5b82018360208201111561049857600080fd5b803590602001918460208302840111600160201b831117156104b957600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550610ae5945050505050565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561053357818101518382015260200161051b565b505050509050019250505060405180910390f35b61011a610bd1565b6103c26004803603604081101561056557600080fd5b506001600160a01b0381351690602001351515610bd7565b61011a610cc6565b61011a610ccc565b610153600480360360408110156105a357600080fd5b506001600160a01b0381358116916020013516610cd2565b6103c2600480360360a08110156105d157600080fd5b6001600160a01b03823581169260208101359091169160408201359160608101359181019060a081016080820135600160201b81111561061057600080fd5b82018360208201111561062257600080fd5b803590602001918460018302840111600160201b8311171561064357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610d00945050505050565b60006001600160a01b0383166106cb5760405162461bcd60e51b815260040180806020018281038252602b815260200180611612602b913960400191505060405180910390fd5b5060009081526001602090815260408083206001600160a01b03949094168352929052205490565b6001600160e01b03191660009081526020819052604090205460ff1690565b60038054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561079e5780601f106107735761010080835404028352916020019161079e565b820191906000526020600020905b81548152906001019060200180831161078157829003601f168201915b50505050509050919050565b6103eb81565b81518351146107f05760405162461bcd60e51b81526004018080602001828103825260288152602001806117396028913960400191505060405180910390fd5b6001600160a01b0384166108355760405162461bcd60e51b81526004018080602001828103825260258152602001806116666025913960400191505060405180910390fd5b61083d610f32565b6001600160a01b0316856001600160a01b03161480610868575061086885610863610f32565b610cd2565b6108a35760405162461bcd60e51b815260040180806020018281038252603281526020018061168b6032913960400191505060405180910390fd5b60006108ad610f32565b90506108bd818787878787610aa6565b60005b84518110156109be5760008582815181106108d757fe5b6020026020010151905060008583815181106108ef57fe5b6020026020010151905061095c816040518060600160405280602a81526020016116bd602a91396001600086815260200190815260200160002060008d6001600160a01b03166001600160a01b0316815260200190815260200160002054610f369092919063ffffffff16565b60008381526001602090815260408083206001600160a01b038e811685529252808320939093558a16815220546109939082610ecb565b60009283526001602081815260408086206001600160a01b038d1687529091529093205550016108c0565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b83811015610a44578181015183820152602001610a2c565b50505050905001838103825284818151815260200191508051906020019060200280838360005b83811015610a83578181015183820152602001610a6b565b5050505090500194505050505060405180910390a4610aa6818787878787610fcd565b505050505050565b6103e881565b600480546001908101918290556040805160208101909152600080825292610add92339261124c565b506004545b90565b60608151835114610b275760405162461bcd60e51b81526004018080602001828103825260298152602001806117106029913960400191505060405180910390fd5b6000835167ffffffffffffffff81118015610b4157600080fd5b50604051908082528060200260200182016040528015610b6b578160200160208202803683370190505b50905060005b8451811015610bc957610baa858281518110610b8957fe5b6020026020010151858381518110610b9d57fe5b6020026020010151610684565b828281518110610bb657fe5b6020908102919091010152600101610b71565b509392505050565b6103ec81565b816001600160a01b0316610be9610f32565b6001600160a01b03161415610c2f5760405162461bcd60e51b81526004018080602001828103825260298152602001806116e76029913960400191505060405180910390fd5b8060026000610c3c610f32565b6001600160a01b03908116825260208083019390935260409182016000908120918716808252919093529120805460ff191692151592909217909155610c80610f32565b6001600160a01b03167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405180821515815260200191505060405180910390a35050565b6103ea81565b6103e981565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205460ff1690565b6001600160a01b038416610d455760405162461bcd60e51b81526004018080602001828103825260258152602001806116666025913960400191505060405180910390fd5b610d4d610f32565b6001600160a01b0316856001600160a01b03161480610d735750610d7385610863610f32565b610dae5760405162461bcd60e51b815260040180806020018281038252602981526020018061163d6029913960400191505060405180910390fd5b6000610db8610f32565b9050610dd8818787610dc988611354565b610dd288611354565b87610aa6565b610e1f836040518060600160405280602a81526020016116bd602a913960008781526001602090815260408083206001600160a01b038d1684529091529020549190610f36565b60008581526001602090815260408083206001600160a01b038b81168552925280832093909355871681522054610e569084610ecb565b60008581526001602090815260408083206001600160a01b03808b168086529184529382902094909455805188815291820187905280518a8416938616927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292908290030190a4610aa6818787878787611399565b600082820183811015610f25576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b3b151590565b3390565b60008184841115610fc55760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610f8a578181015183820152602001610f72565b50505050905090810190601f168015610fb75780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b610fdf846001600160a01b0316610f2c565b15610aa657836001600160a01b031663bc197c8187878686866040518663ffffffff1660e01b815260040180866001600160a01b03168152602001856001600160a01b03168152602001806020018060200180602001848103845287818151815260200191508051906020019060200280838360005b8381101561106d578181015183820152602001611055565b50505050905001848103835286818151815260200191508051906020019060200280838360005b838110156110ac578181015183820152602001611094565b50505050905001848103825285818151815260200191508051906020019080838360005b838110156110e85781810151838201526020016110d0565b50505050905090810190601f1680156111155780820380516001836020036101000a031916815260200191505b5098505050505050505050602060405180830381600087803b15801561113a57600080fd5b505af192505050801561115f57506040513d602081101561115a57600080fd5b505160015b6111f45761116b611510565b8061117657506111bd565b60405162461bcd60e51b8152602060048201818152835160248401528351849391928392604401919085019080838360008315610f8a578181015183820152602001610f72565b60405162461bcd60e51b81526004018080602001828103825260348152602001806115b66034913960400191505060405180910390fd5b6001600160e01b0319811663bc197c8160e01b146112435760405162461bcd60e51b81526004018080602001828103825260288152602001806115ea6028913960400191505060405180910390fd5b50505050505050565b6001600160a01b0384166112915760405162461bcd60e51b81526004018080602001828103825260218152602001806117616021913960400191505060405180910390fd5b600061129b610f32565b90506112ad81600087610dc988611354565b60008481526001602090815260408083206001600160a01b03891684529091529020546112da9084610ecb565b60008581526001602090815260408083206001600160a01b03808b16808652918452828520959095558151898152928301889052815190948616927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292908290030190a461134d81600087878787611399565b5050505050565b6040805160018082528183019092526060916000919060208083019080368337019050509050828160008151811061138857fe5b602090810291909101015292915050565b6113ab846001600160a01b0316610f2c565b15610aa657836001600160a01b031663f23a6e6187878686866040518663ffffffff1660e01b815260040180866001600160a01b03168152602001856001600160a01b0316815260200184815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561143a578181015183820152602001611422565b50505050905090810190601f1680156114675780820380516001836020036101000a031916815260200191505b509650505050505050602060405180830381600087803b15801561148a57600080fd5b505af19250505080156114af57506040513d60208110156114aa57600080fd5b505160015b6114bb5761116b611510565b6001600160e01b0319811663f23a6e6160e01b146112435760405162461bcd60e51b81526004018080602001828103825260288152602001806115ea6028913960400191505060405180910390fd5b60e01c90565b600060443d101561152057610ae2565b600481823e6308c379a0611534825161150a565b1461153e57610ae2565b6040513d600319016004823e80513d67ffffffffffffffff816024840111818411171561156e5750505050610ae2565b828401925082519150808211156115885750505050610ae2565b503d830160208284010111156115a057505050610ae2565b601f01601f191681016020016040529150509056fe455243313135353a207472616e7366657220746f206e6f6e2045524331313535526563656976657220696d706c656d656e746572455243313135353a204552433131353552656365697665722072656a656374656420746f6b656e73455243313135353a2062616c616e636520717565727920666f7220746865207a65726f2061646472657373455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243313135353a207472616e7366657220746f20746865207a65726f2061646472657373455243313135353a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243313135353a20696e73756666696369656e742062616c616e636520666f72207472616e73666572455243313135353a2073657474696e6720617070726f76616c2073746174757320666f722073656c66455243313135353a206163636f756e747320616e6420696473206c656e677468206d69736d61746368455243313135353a2069647320616e6420616d6f756e7473206c656e677468206d69736d61746368455243313135353a206d696e7420746f20746865207a65726f2061646472657373a26469706673582212206e375b115d82c46e1be80c2b01919b54d6186cb7bea4daf25b1e10e516fdb34064736f6c63430007060033455243313135353a207472616e7366657220746f206e6f6e2045524331313535526563656976657220696d706c656d656e746572455243313135353a204552433131353552656365697665722072656a656374656420746f6b656e7368747470733a2f2f6170692e626363672e6469676974616c2f6170692f626363672f31455243313135353a206d696e7420746f20746865207a65726f2061646472657373";

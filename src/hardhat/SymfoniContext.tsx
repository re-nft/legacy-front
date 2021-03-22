/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { providers, Signer, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Web3Modal, { IProviderOptions } from "web3modal";
import RentNftDeployment from "./deployments/localhost/RentNft.json";
import { RentNft } from "./typechain/RentNft";
import { RentNft__factory } from "./typechain/factories/RentNft__factory";
import ResolverDeployment from "./deployments/localhost/Resolver.json";
import { Resolver } from "./typechain/Resolver";
import { Resolver__factory } from "./typechain/factories/Resolver__factory";
import MyERC1155Deployment from "./deployments/localhost/MyERC1155.json";
import { MyERC1155 } from "./typechain/MyERC1155";
import { MyERC1155__factory } from "./typechain/factories/MyERC1155__factory";
import { Faucet } from "./typechain/Faucet";
import { Faucet__factory } from "./typechain/factories/Faucet__factory";
import MyERC20Deployment from "./deployments/localhost/MyERC20.json";
import { MyERC20 } from "./typechain/MyERC20";
import { MyERC20__factory } from "./typechain/factories/MyERC20__factory";
import MyERC721Deployment from "./deployments/localhost/MyERC721.json";
import { MyERC721 } from "./typechain/MyERC721";
import { MyERC721__factory } from "./typechain/factories/MyERC721__factory";
import UtilsDeployment from "./deployments/localhost/Utils.json";
import { Utils } from "./typechain/Utils";
import { Utils__factory } from "./typechain/factories/Utils__factory";
import { ERC1155 } from "./typechain/ERC1155";
import { ERC1155__factory } from "./typechain/factories/ERC1155__factory";
import { ERC20 } from "./typechain/ERC20";
import { ERC20__factory } from "./typechain/factories/ERC20__factory";
import { ERC721 } from "./typechain/ERC721";
import { ERC721__factory } from "./typechain/factories/ERC721__factory";
import { ERC721Holder } from "./typechain/ERC721Holder";
import { ERC721Holder__factory } from "./typechain/factories/ERC721Holder__factory";

const emptyContract = {
    instance: undefined,
    factory: undefined
};
const defaultProvider: providers.Provider | undefined = undefined;
export const ProviderContext = React.createContext<[providers.Provider | undefined, React.Dispatch<React.SetStateAction<providers.Provider | undefined>>]>([defaultProvider, () => { }]);
const defaultCurrentAddress: string = "";
export const CurrentAddressContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>([defaultCurrentAddress, () => { }]);
const defaultSigner: Signer | undefined = undefined;
export const SignerContext = React.createContext<[Signer | undefined, React.Dispatch<React.SetStateAction<Signer | undefined>>]>([defaultSigner, () => { }]);
const defaultSymfoniContext: SymfoniContextInterface = {
    currentHardhatProvider: "",
    init: () => { throw Error("Symfoni context not initialized") },
    loading: false,
    messages: [],
    providers: []
};
export const SymfoniContext = React.createContext<SymfoniContextInterface>(defaultSymfoniContext);
export const RentNftContext = React.createContext<SymfoniRentNft>(emptyContract);
export const ResolverContext = React.createContext<SymfoniResolver>(emptyContract);
export const MyERC1155Context = React.createContext<SymfoniMyERC1155>(emptyContract);
export const FaucetContext = React.createContext<SymfoniFaucet>(emptyContract);
export const MyERC20Context = React.createContext<SymfoniMyERC20>(emptyContract);
export const MyERC721Context = React.createContext<SymfoniMyERC721>(emptyContract);
export const UtilsContext = React.createContext<SymfoniUtils>(emptyContract);
export const ERC1155Context = React.createContext<SymfoniERC1155>(emptyContract);
export const ERC20Context = React.createContext<SymfoniERC20>(emptyContract);
export const ERC721Context = React.createContext<SymfoniERC721>(emptyContract);
export const ERC721HolderContext = React.createContext<SymfoniERC721Holder>(emptyContract);

export interface SymfoniContextInterface {
    init: (provider?: string) => void;
    loading: boolean;
    messages: string[];
    currentHardhatProvider: string;
    providers: string[];
}

export interface SymfoniProps {
    autoInit?: boolean;
    showLoading?: boolean;
    loadingComponent?: React.ReactNode;
}

export interface SymfoniRentNft {
    instance?: RentNft;
    factory?: RentNft__factory;
}

export interface SymfoniResolver {
    instance?: Resolver;
    factory?: Resolver__factory;
}

export interface SymfoniMyERC1155 {
    instance?: MyERC1155;
    factory?: MyERC1155__factory;
}

export interface SymfoniFaucet {
    instance?: Faucet;
    factory?: Faucet__factory;
}

export interface SymfoniMyERC20 {
    instance?: MyERC20;
    factory?: MyERC20__factory;
}

export interface SymfoniMyERC721 {
    instance?: MyERC721;
    factory?: MyERC721__factory;
}

export interface SymfoniUtils {
    instance?: Utils;
    factory?: Utils__factory;
}

export interface SymfoniERC1155 {
    instance?: ERC1155;
    factory?: ERC1155__factory;
}

export interface SymfoniERC20 {
    instance?: ERC20;
    factory?: ERC20__factory;
}

export interface SymfoniERC721 {
    instance?: ERC721;
    factory?: ERC721__factory;
}

export interface SymfoniERC721Holder {
    instance?: ERC721Holder;
    factory?: ERC721Holder__factory;
}

export const Symfoni: React.FC<SymfoniProps> = ({
    showLoading = true,
    autoInit = true,
    ...props
}) => {
    const [initializeCounter, setInitializeCounter] = useState(0);
    const [currentHardhatProvider, setCurrentHardhatProvider] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [signer, setSigner] = useState<Signer | undefined>(defaultSigner);
    const [provider, setProvider] = useState<providers.Provider | undefined>(defaultProvider);
    const [currentAddress, setCurrentAddress] = useState<string>(defaultCurrentAddress);
    const [fallbackProvider] = useState<string | undefined>(undefined);
    const [providerPriority, setProviderPriority] = useState<string[]>(["web3modal", "hardhat"]);
    const [RentNft, setRentNft] = useState<SymfoniRentNft>(emptyContract);
    const [Resolver, setResolver] = useState<SymfoniResolver>(emptyContract);
    const [MyERC1155, setMyERC1155] = useState<SymfoniMyERC1155>(emptyContract);
    const [Faucet, setFaucet] = useState<SymfoniFaucet>(emptyContract);
    const [MyERC20, setMyERC20] = useState<SymfoniMyERC20>(emptyContract);
    const [MyERC721, setMyERC721] = useState<SymfoniMyERC721>(emptyContract);
    const [Utils, setUtils] = useState<SymfoniUtils>(emptyContract);
    const [ERC1155, setERC1155] = useState<SymfoniERC1155>(emptyContract);
    const [ERC20, setERC20] = useState<SymfoniERC20>(emptyContract);
    const [ERC721, setERC721] = useState<SymfoniERC721>(emptyContract);
    const [ERC721Holder, setERC721Holder] = useState<SymfoniERC721Holder>(emptyContract);
    useEffect(() => {
        if (messages.length > 0)
            console.debug(messages.pop())
    }, [messages])

    const getProvider = async (): Promise<{ provider: providers.Provider, hardhatProviderName: string } | undefined> => {
        let hardhatProviderName = "Not set";
        let _providerPriority = [...providerPriority];
        // Fallback provider
        if (fallbackProvider && autoInit && initializeCounter === 0) {
            if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER") === null) {
                _providerPriority = _providerPriority.sort((a, b) => {
                    return a === fallbackProvider ? -1 : b === fallbackProvider ? 1 : 0;
                })
            }
        }
        const provider = await _providerPriority.reduce(async (maybeProvider: Promise<providers.Provider | undefined>, providerIdentification) => {
            let foundProvider = await maybeProvider
            if (foundProvider) {
                return Promise.resolve(foundProvider)
            }
            else {
                switch (providerIdentification.toLowerCase()) {
                    case "web3modal":
                        try {
                            const provider = await getWeb3ModalProvider()
                            const web3provider = new ethers.providers.Web3Provider(provider);
                            hardhatProviderName = "web3modal";
                            return Promise.resolve(web3provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        }
                    case "hardhat":
                        try {
                            const provider = new ethers.providers.JsonRpcProvider({
                                url: "http://localhost:8545",
                            });
                            hardhatProviderName = "hardhat";
                            return Promise.resolve(provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        } default:
                        return Promise.resolve(undefined)
                }
            }
        }, Promise.resolve(undefined)) // end reduce
        return provider ? { provider, hardhatProviderName } : undefined
    };
    const getSigner = async (_provider: providers.Provider, hardhatProviderName: string): Promise<Signer | undefined> => {
        switch (hardhatProviderName) {
            case "web3modal":
                const web3provider = _provider as ethers.providers.Web3Provider
                return await web3provider.getSigner()
            case "hardhat":
                return ethers.Wallet.fromMnemonic("test test test test test test test test test test test junk").connect(_provider)
            default:
                return undefined
        }
    };
    const getWeb3ModalProvider = async (): Promise<any> => {
        const providerOptions: IProviderOptions = {

        };
        const web3Modal = new Web3Modal({
            // network: "mainnet",
            cacheProvider: false,
            providerOptions, // required
        });
        return await web3Modal.connect();
    };

    useEffect(() => {
        let subscribed = true
        const doAsync = async () => {
            const finish = (text: string) => {
                setLoading(false)
                setMessages(old => [...old, text])
            }
            const finishWithContracts = (text: string) => {
                setRentNft(getRentNft(_provider, _signer))
                setResolver(getResolver(_provider, _signer))
                setMyERC1155(getMyERC1155(_provider, _signer))
                setFaucet(getFaucet(_provider, _signer))
                setMyERC20(getMyERC20(_provider, _signer))
                setMyERC721(getMyERC721(_provider, _signer))
                setUtils(getUtils(_provider, _signer))
                setERC1155(getERC1155(_provider, _signer))
                setERC20(getERC20(_provider, _signer))
                setERC721(getERC721(_provider, _signer))
                setERC721Holder(getERC721Holder(_provider, _signer))
                finish(text)
            }
            if (!autoInit && initializeCounter === 0) return finish("Auto init turned off.")
            setLoading(true)
            setMessages(old => [...old, "Initiating Symfoni React"])
            const providerObject = await getProvider() // getProvider can actually return undefined, see issue https://github.com/microsoft/TypeScript/issues/11094

            if (!subscribed || !providerObject) return finish("No provider or signer.")
            const _provider = providerObject.provider
            setProvider(_provider)
            setMessages(old => [...old, "Useing " + providerObject.hardhatProviderName])
            setCurrentHardhatProvider(providerObject.hardhatProviderName)
            const _signer = await getSigner(_provider, providerObject.hardhatProviderName);

            if (!subscribed || !_signer) return finishWithContracts("Provider, without signer.")
            setSigner(_signer)
            setMessages(old => [...old, "Useing signer"])
            const address = await _signer.getAddress()

            if (!subscribed || !address) return finishWithContracts("Provider and signer, without address.")
            setCurrentAddress(address)

            return finishWithContracts("Completed Symfoni context initialization.")
        };
        doAsync();
        return () => { subscribed = false }
    }, [initializeCounter])

    const getRentNft = (_provider: providers.Provider, _signer?: Signer) => {

        const contractAddress = RentNftDeployment.receipt.contractAddress
        const instance = _signer ? RentNft__factory.connect(contractAddress, _signer) : RentNft__factory.connect(contractAddress, _provider)
        const contract: SymfoniRentNft = {
            instance: instance,
            factory: _signer ? new RentNft__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getResolver = (_provider: providers.Provider, _signer?: Signer) => {

        const contractAddress = ResolverDeployment.receipt.contractAddress
        const instance = _signer ? Resolver__factory.connect(contractAddress, _signer) : Resolver__factory.connect(contractAddress, _provider)
        const contract: SymfoniResolver = {
            instance: instance,
            factory: _signer ? new Resolver__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getMyERC1155 = (_provider: providers.Provider, _signer?: Signer) => {

        const contractAddress = MyERC1155Deployment.receipt.contractAddress
        const instance = _signer ? MyERC1155__factory.connect(contractAddress, _signer) : MyERC1155__factory.connect(contractAddress, _provider)
        const contract: SymfoniMyERC1155 = {
            instance: instance,
            factory: _signer ? new MyERC1155__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getFaucet = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? Faucet__factory.connect(ethers.constants.AddressZero, _signer) : Faucet__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniFaucet = {
            instance: instance,
            factory: _signer ? new Faucet__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getMyERC20 = (_provider: providers.Provider, _signer?: Signer) => {

        const contractAddress = MyERC20Deployment.receipt.contractAddress
        const instance = _signer ? MyERC20__factory.connect(contractAddress, _signer) : MyERC20__factory.connect(contractAddress, _provider)
        const contract: SymfoniMyERC20 = {
            instance: instance,
            factory: _signer ? new MyERC20__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getMyERC721 = (_provider: providers.Provider, _signer?: Signer) => {

        const contractAddress = MyERC721Deployment.receipt.contractAddress
        const instance = _signer ? MyERC721__factory.connect(contractAddress, _signer) : MyERC721__factory.connect(contractAddress, _provider)
        const contract: SymfoniMyERC721 = {
            instance: instance,
            factory: _signer ? new MyERC721__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getUtils = (_provider: providers.Provider, _signer?: Signer) => {

        const contractAddress = UtilsDeployment.receipt.contractAddress
        const instance = _signer ? Utils__factory.connect(contractAddress, _signer) : Utils__factory.connect(contractAddress, _provider)
        const contract: SymfoniUtils = {
            instance: instance,
            factory: _signer ? new Utils__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getERC1155 = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? ERC1155__factory.connect(ethers.constants.AddressZero, _signer) : ERC1155__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniERC1155 = {
            instance: instance,
            factory: _signer ? new ERC1155__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getERC20 = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? ERC20__factory.connect(ethers.constants.AddressZero, _signer) : ERC20__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniERC20 = {
            instance: instance,
            factory: _signer ? new ERC20__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getERC721 = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? ERC721__factory.connect(ethers.constants.AddressZero, _signer) : ERC721__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniERC721 = {
            instance: instance,
            factory: _signer ? new ERC721__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getERC721Holder = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? ERC721Holder__factory.connect(ethers.constants.AddressZero, _signer) : ERC721Holder__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniERC721Holder = {
            instance: instance,
            factory: _signer ? new ERC721Holder__factory(_signer) : undefined,
        }
        return contract
    }
        ;

    const handleInitProvider = (provider?: string) => {
        if (provider) {
            setProviderPriority(old => old.sort((a, b) => {
                return a === provider ? -1 : b === provider ? 1 : 0;
            }))
        }
        setInitializeCounter(initializeCounter + 1)
    }
    return (
        <SymfoniContext.Provider value={{ init: (provider) => handleInitProvider(provider), providers: providerPriority, currentHardhatProvider, loading, messages }}>
            <ProviderContext.Provider value={[provider, setProvider]}>
                <SignerContext.Provider value={[signer, setSigner]}>
                    <CurrentAddressContext.Provider value={[currentAddress, setCurrentAddress]}>
                        <RentNftContext.Provider value={RentNft}>
                            <ResolverContext.Provider value={Resolver}>
                                <MyERC1155Context.Provider value={MyERC1155}>
                                    <FaucetContext.Provider value={Faucet}>
                                        <MyERC20Context.Provider value={MyERC20}>
                                            <MyERC721Context.Provider value={MyERC721}>
                                                <UtilsContext.Provider value={Utils}>
                                                    <ERC1155Context.Provider value={ERC1155}>
                                                        <ERC20Context.Provider value={ERC20}>
                                                            <ERC721Context.Provider value={ERC721}>
                                                                <ERC721HolderContext.Provider value={ERC721Holder}>
                                                                    {showLoading && loading ?
                                                                        props.loadingComponent
                                                                            ? props.loadingComponent
                                                                            : <div>
                                                                                {messages.map((msg, i) => (
                                                                                    <p key={i}>{msg}</p>
                                                                                ))}
                                                                            </div>
                                                                        : props.children
                                                                    }
                                                                </ERC721HolderContext.Provider >
                                                            </ERC721Context.Provider >
                                                        </ERC20Context.Provider >
                                                    </ERC1155Context.Provider >
                                                </UtilsContext.Provider >
                                            </MyERC721Context.Provider >
                                        </MyERC20Context.Provider >
                                    </FaucetContext.Provider >
                                </MyERC1155Context.Provider >
                            </ResolverContext.Provider >
                        </RentNftContext.Provider >
                    </CurrentAddressContext.Provider>
                </SignerContext.Provider>
            </ProviderContext.Provider>
        </SymfoniContext.Provider>
    )

};

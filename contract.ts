interface ContractInformation {
    contractAddress: string,
    factoryAddress: string,
    routerAddress: string,
    wethAddress: string,
    gerAddress: string
    usdtAddress: string
    solAddress: string
    wbtcAddress: string
    eosAddress: string
    linkAddress: string
}

export interface Token {
    icon: string
    name: string,
    fullName?: string
    address: string
}

const developmentContractInfo: ContractInformation = {
    contractAddress: "0x494E48072A793fA0759B3Aa3Dbbce6540226b9B9",
    factoryAddress: "0x62C0A60A2cb3b1507936eB7312AEd460932FfcC8",
    routerAddress: "0xAa532Ed76b9630061D33594788318A0E0b39c303",
    wethAddress: "0x2047A5b1Ff5Ca68E41beAe401A81E3E080d026D6",
    gerAddress: "0xcc9349E6bd45988F139F486b823F6F4343C5698d",
    usdtAddress: "0x9C99B2F1391c82005B5075D122B9BCD563fD330A",
    solAddress: "0x5828E8ecBF921b8644d2917Dd215E4A78Ee29492",
    eosAddress: "0xf423d80462972Afd68211f51fb19C404d740fbD8",
    wbtcAddress: "0x13dE938936a926Afc75150C244112b25726fA28c",
    linkAddress: "0xcC084202Fb404dA39ADc03255e7e77Da8b49cD7b"
}

const productionContractInfo: ContractInformation = {
    contractAddress: "0x72fd2750bA0189eFF5aDB8a23FBF4C5f20c2E10A",
    factoryAddress: "0x62C0A60A2cb3b1507936eB7312AEd460932FfcC8",
    routerAddress: "0xAa532Ed76b9630061D33594788318A0E0b39c303",
    wethAddress: "0x2047A5b1Ff5Ca68E41beAe401A81E3E080d026D6",
    gerAddress: "0xcc9349E6bd45988F139F486b823F6F4343C5698d",
    usdtAddress: "0x9C99B2F1391c82005B5075D122B9BCD563fD330A",
    solAddress: "0x5828E8ecBF921b8644d2917Dd215E4A78Ee29492",
    eosAddress: "0xf423d80462972Afd68211f51fb19C404d740fbD8",
    wbtcAddress: "0x13dE938936a926Afc75150C244112b25726fA28c",
    linkAddress: "0xcC084202Fb404dA39ADc03255e7e77Da8b49cD7b"
}

export const contractInfo: ContractInformation = process.env.NODE_ENV == 'development' ? developmentContractInfo : productionContractInfo


export const allToken: Token[] = [
    {
        icon: "/static/img/logo.svg",
        name: "GER",
        fullName: "General",
        address: contractInfo.gerAddress
    },
    {
        icon: "/static/img/weth.png",
        name: "WETH",
        fullName: "WETH",
        address: contractInfo.wethAddress
    },
    {
        icon: "/static/img/USDT.svg",
        name: "USDT",
        fullName: "Tether USD",
        address: contractInfo.usdtAddress
    },
    {
        icon: "/static/img/sol.png",
        name: "SOL",
        fullName: "Solana SOL",
        address: contractInfo.solAddress
    },
    {
        icon: "/static/img/wbtc.png",
        name: "WBTC",
        fullName: "Wrapped Bitcoin",
        address: contractInfo.wbtcAddress
    },
    {
        icon: "/static/img/link.png",
        name: "LINK",
        fullName: "Chainlink",
        address: contractInfo.linkAddress
    }
]
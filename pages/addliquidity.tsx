import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SelectTokenModal from "../components/common/SelectTokenModal";
import {useEffect, useState} from "react";
import {allToken, contractInfo, Token} from "../contract";
import {
    addLiquidity,
    addLiquidityETH,
    balanceOf,
    decimals,
    erc20Allowance,
    erc20Approve,
    getPair,
    getReserves
} from "../connectors/ethersContract";
import {useWeb3React} from "@web3-react/core";
import {BigNumber, formatFixed} from "@ethersproject/bignumber";
import {parseUnits} from "ethers/lib/utils";

const styles = {
    main_bg: {
        "width": "100%",
        "minHeight": "88vh",
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        marginTop: 70,
        marginBottom: 70
    },
    center_box: {
        "width": "580px",
        "background": "rgba(25, 25, 27, 0.8)",
        "border": "1px solid rgba(163, 163, 163, 0.15)",
        "borderRadius": "50px",
        "margin": "0 auto"
    },
    ration_box: {
        BoxSizing: "border-box",
        border: "1px solid rgba(163, 163, 163, 0.12)",
        borderRadius: "20px",
        marginTop: 28,
        marginBottom: 28,
        display: "flex",
        padding: 20,
    },
    ration_box_item: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        TextAlign: 'center'
    },
    ration_box_item_line1: {
        fontSize: 16,
        color: "#FFFFFF"
    },
    ration_box_item_line2: {
        fontSize: 14,
        color: "#A3A3A399"
    }
}
export default function AddLiquidity() {
    let isTokenReversal = false
    const {provider, isActive, accounts} = useWeb3React()
    const [selectTokenModelVisible, setSelectTokenModelVisible] = useState(false)
    const [selectIndex, setSelectIndex] = useState(0)
    const [selectedTokens, setSelectedTokens] = useState<Token[]>([
        allToken[1], allToken[0]
    ])
    const [balances, setBalances] = useState<number[]>([0, 0])
    const [reserves, setReserves] = useState<BigNumber[]>([BigNumber.from(1), BigNumber.from(1)])
    const [balanceDecimals, setBalanceDecimals] = useState<number[]>([18, 18])
    const [isRequestPair, setIsRequestPair] = useState(false)
    const [pairAddress, setPairAddress] = useState<string | undefined>(undefined)
    const [token0Value, setToken0Value] = useState<number>(0)
    const [token1Value, setToken1Value] = useState<number>(0)

    useEffect(() => {
        updateBalances()
    }, [isActive, selectedTokens])

    useEffect(() => {
        updateReserves()
    }, [pairAddress])

    const updateBalances = () => {
        if (isActive) {
            Promise.all([decimals(selectedTokens[0].address, provider), decimals(selectedTokens[1].address, provider)]).then((decimals: number[]) => {
                console.log("decimals ", decimals)
                setBalanceDecimals(decimals)
                Promise.all([balanceOf(accounts[0], selectedTokens[0].address, provider), balanceOf(accounts[0], selectedTokens[1].address, provider)]).then((values: BigNumber[]) => {
                    console.log("balanceOf ", values)
                    let balanceWei = []
                    balanceWei[0] = Number.parseFloat(formatFixed(values[0], decimals[0]))
                    balanceWei[1] = Number.parseFloat(formatFixed(values[1], decimals[1]))
                    setBalances(balanceWei)
                    console.log("balanceOf balanceWei ", balanceWei)
                })
            })
            isTokenReversal = selectedTokens[0].address.toLowerCase() >= selectedTokens[1].address.toLowerCase();
            setIsRequestPair(true)
            getPair(isTokenReversal ? selectedTokens[1].address : selectedTokens[0].address, isTokenReversal ? selectedTokens[0].address : selectedTokens[1].address, provider).then(value => {
                console.log("getPair address: ", value)
                if (value === "0x0000000000000000000000000000000000000000") {
                    setPairAddress(undefined)
                } else {
                    setPairAddress(value)
                }
            })
        }
    }

    const updateReserves = () => {
        console.log("updateReserves pairAddress", pairAddress)
        if (pairAddress) {
            getReserves(pairAddress, provider).then((results) => {
                console.log("getReserves", results)
                setReserves(isTokenReversal ? [results[1], results[0]] : [results[0], results[1]])
                setIsRequestPair(false)
            })
        } else {
            setReserves([BigNumber.from(1), BigNumber.from(1)])
            setIsRequestPair(false)
        }
    }

    return (
        <div>
            <Header/>
            <div className="main-bg" style={styles.main_bg}>
                <div style={styles.center_box}>
                    <div className="top">
                        <div className="tit">
                            <h2>Add Liquidity</h2>
                        </div>
                    </div>
                    <div style={{
                        marginLeft: 45,
                        marginRight: 45,
                        marginTop: 27,
                        fontSize: 14
                    }
                    }>
                        <div style={{color: "#FFA318"}}><b>Tip:</b></div> By providing liquidity, you can get your LP tokens.
                        Stake
                        your LP tokens and then get your KST rewards that the amount of rewards is calculated based on
                        your liquidity proportion in the corresponding mining pool, and the user transaction fees will
                        go into the community development fund pool for project development and KST repurchase.
                    </div>
                    <div className="con">
                        <div className="con-tit">
                            <h3>Swap {selectedTokens[0].name} to receive {selectedTokens[1].name}</h3>
                            <div
                                className="con-tit-right"
                                data-toggle="modal"
                                data-target="#slipModal"
                            >
                                <span>Slippage: </span>
                                <span style={{color: "#fff"}}>0.5%</span>
                                <img
                                    style={{marginLeft: 4}}
                                    alt="icon"
                                    src="/static/img/Frame3.svg"
                                    width={16}
                                    height={16}
                                />
                            </div>
                        </div>
                        <div className="exc-box" style={{marginTop: 24}}>
                            <div
                                className="currency-type"
                                data-toggle="modal"
                                data-target="#selTokModal"
                                onClick={() => {
                                    setSelectIndex(0)
                                    setSelectTokenModelVisible(true)
                                }}
                            >
                                <img alt="icon" src={selectedTokens[0].icon} width={25} height={24}/>
                                <span className="text">{selectedTokens[0].name}</span>
                                <img alt="icon" src="/static/img/Union.svg" width={11} height={7}/>
                            </div>
                            <input className="exc-ipt" type="number" inputMode="numeric" value={token0Value.toString()}
                                   onChange={event => {
                                       let inputValue: number
                                       if (!event.target.value || event.target.value === '') {
                                           inputValue = 0
                                       } else {
                                           inputValue = Number.parseFloat(event.target.value)
                                       }
                                       if (inputValue > balances[0]) {
                                           inputValue = balances[0]
                                       }
                                       setToken0Value(inputValue)
                                       if (pairAddress) {
                                           setToken1Value(reserves[1].div(reserves[0]).mul(inputValue).toNumber())
                                       }
                                   }}/>
                        </div>
                        <div className="exc-icon">
                            <img alt="icon" src="/static/img/Frame7.svg" width={40} height={41}/>
                        </div>
                        <div className="exc-box">
                            <div className="currency-type" onClick={() => {
                                setSelectIndex(1)
                                setSelectTokenModelVisible(true)
                            }}>
                                <img alt="icon" src={selectedTokens[1].icon} width={25} height={24}/>
                                <span className="text">{selectedTokens[1].name}</span>
                                <img alt="icon" src="/static/img/Union.svg" width={11} height={7}/>
                            </div>
                            <input className="exc-ipt" type="number" inputMode="numeric" value={token1Value.toString()}
                                   onChange={event => {
                                       let inputValue
                                       if (!event.target.value || event.target.value === '') {
                                           inputValue = 0
                                       } else {
                                           inputValue = Number.parseFloat(event.target.value)
                                       }
                                       if (inputValue > balances[1]) {
                                           inputValue = balances[1]
                                       }
                                       setToken1Value(inputValue)
                                       if (pairAddress) {
                                           setToken0Value(reserves[0].div(reserves[1]).mul(inputValue).toNumber())
                                       }
                                   }}/>
                        </div>
                        <div className="exc-bot">
                            <span>Prices and pool share</span>
                        </div>
                        <div style={styles.ration_box}>
                            <div style={styles.ration_box_item}>
                                <div style={styles.ration_box_item_line1}>
                                    {pairAddress ? reserves[0].div(reserves[1]).toString() : '0'}
                                </div>
                                <div style={styles.ration_box_item_line2}>
                                    {selectedTokens[0].name} / {selectedTokens[1].name}
                                </div>
                            </div>
                            <div style={styles.ration_box_item}>
                                <div style={styles.ration_box_item_line1}>
                                    {pairAddress ? reserves[1].div(reserves[0]).toString() : '0'}
                                </div>
                                <div style={styles.ration_box_item_line2}>
                                    {selectedTokens[1].name} / {selectedTokens[0].name}
                                </div>
                            </div>
                            <div style={styles.ration_box_item}>
                                <div style={styles.ration_box_item_line1}>
                                    0
                                </div>
                                <div style={styles.ration_box_item_line2}>
                                    Share of Pool
                                </div>
                            </div>
                        </div>
                        <div className="swap-btn" style={{marginBottom: 50, marginTop: 50}} onClick={() => {
                            if (balances[0] < token0Value || balances[1] < token1Value) {
                                // not sufficient funds
                                return
                            }
                            let allAllowancePromise = []
                            selectedTokens.forEach(selectedToken => {
                                if (selectedToken.address != contractInfo.wethAddress) {
                                    allAllowancePromise.push(erc20Allowance(selectedToken.address, accounts[0], provider))
                                }
                            })
                            let hasWETH = allAllowancePromise.length === 1
                            Promise.all(allAllowancePromise).then((values: BigNumber[]) => {
                                console.log("erc20Allowance", values)
                                let approvePromise = []
                                if (hasWETH) {
                                    // has WETH
                                    selectedTokens.forEach((selectedToken, index) => {
                                        if (selectedToken.address != contractInfo.wethAddress) {
                                            if (values[0].lt(index === 0 ? token0Value : token1Value)) {
                                                approvePromise.push(erc20Approve(selectedToken.address, provider))
                                            }
                                        }
                                    })
                                } else {
                                    if (values[0].lt(token0Value)) {
                                        approvePromise.push(erc20Approve(selectedTokens[0].address, provider))
                                    }
                                    if (values[1].lt(token1Value)) {
                                        approvePromise.push(erc20Approve(selectedTokens[1].address, provider))
                                    }
                                }
                                Promise.all(approvePromise).then(approves => {
                                    let allApprove = true
                                    approves.forEach((approve: boolean) => {
                                        if (!approve) {
                                            allApprove = false
                                        }
                                    })
                                    if (allApprove) {
                                        console.log("allApproved")
                                        provider.getBlock('latest').then((block) => {
                                            const timestamp = block.timestamp;
                                            let deadlineTimestamp = BigNumber.from(timestamp + 3600)
                                            // check WETH
                                            if (hasWETH) {
                                                let ethIndex = selectedTokens[0].address === contractInfo.wethAddress ? 0 : 1;
                                                let otherIndex = ethIndex === 0 ? 1 : 0;
                                                let amountTokenDesired = parseUnits((otherIndex  === 0 ? token0Value : token1Value).toString(), balanceDecimals[otherIndex]);
                                                let amountEthDesired = parseUnits((ethIndex === 0? token0Value : token1Value).toString(), balanceDecimals[ethIndex]);
                                                addLiquidityETH(selectedTokens[otherIndex].address, amountTokenDesired, amountEthDesired, amountTokenDesired.div(200),  amountEthDesired.div(200), accounts[0], deadlineTimestamp, provider).then(addLiquidityResult => {
                                                    console.log('addLiquidityETH', addLiquidityResult)
                                                })
                                            } else {
                                                let amountADesired = parseUnits(token0Value.toString(), balanceDecimals[0])
                                                let amountBDesired = parseUnits(token1Value.toString(), balanceDecimals[1])
                                                addLiquidity(selectedTokens[0].address, selectedTokens[1].address, amountADesired, amountBDesired, amountADesired.div(200), amountBDesired.div(200), accounts[0], deadlineTimestamp, provider).then(addLiquidityResult => {
                                                    console.log('addLiquidity', addLiquidityResult)
                                                })
                                            }
                                        }).catch((error) => {
                                            console.error("err:", error);
                                        });
                                    }
                                })
                            })
                        }}>
                            Add Liquidity{" "}
                            <img
                                alt="icon"
                                src="/static/img/Union2.svg"
                                width={7}
                                height={11}
                                style={{marginLeft: 8}}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
            <SelectTokenModal visible={selectTokenModelVisible} onRequestClose={() => {
                setSelectTokenModelVisible(false)
            }} onSelected={token => {
                selectedTokens[selectIndex] = token
                updateBalances()
            }}/>
        </div>
    )
}

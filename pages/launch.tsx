import Header from "../components/common/Header";
import {useEffect, useState} from "react";
import dayjs from 'dayjs'
import useInterval from "../utils/use_interval";
import Footer from "../components/common/Footer";
import {approveUsdt, buyGer, claimGer, getUserView} from "../connectors/ethersContract";
import {useWeb3React} from "@web3-react/core";
import {formatUnits, parseUnits} from "@ethersproject/units";
import {useRouter} from 'next/router'
import {formatUnitsWithPrecision} from "../utils/decimal_util";
import {DEFAULT_CHAIN_ID} from "../chains";
import {contractInfo} from "../contract";

const styles = {
    buyInput: {
        height: '60px', background: 'rgba(0, 0, 0, 0)', border: '0px', fontWeight: 600,
        fontSize: '24px',
        lineHeight: '30px',
        width: '100%',
        outline: 'none',
        color: 'rgba(163, 163, 163, 0.5)'
    }
}

export default function Launch() {
    const router = useRouter()
    const {provider, isActive, accounts} = useWeb3React()

    const [userView, setUserView] = useState<any>(undefined)
    const [commonUserView, setCommonUserView] = useState<any>(undefined)
    const [remainTime, setRemainTime] = useState<number>(0)
    const [usdtCount, setUsdtCount] = useState<string | null | undefined>(null)
    const [buyEnable, setBuyEnable] = useState(false)
    const [claimEnable, setClaimEnable] = useState(false)

    useEffect(() => {
        if (isActive) {
            getUserView(accounts[0], provider).then((result) => {
                console.log("ethers userview :", result);
                setUserView(result)
                setBuyEnable(true)
                if (result['claimTime']) {
                    const claimTime = Number.parseInt(result['claimTime'].toString())
                    if (claimTime && claimTime != 0) {
                        const currentTime = dayjs().unix()
                        if (claimTime < currentTime) {
                            setClaimEnable(true)
                        }
                    }
                }
            }).catch((err) => {
                console.error("userview error: ", err);
            })
        }
    }, [isActive, accounts])

    const getCommonUserView = () => {
        if (commonUserView) {
            return ''
        }
        console.log("current chain id is : ", DEFAULT_CHAIN_ID)
        console.log("current contract info is : ", contractInfo)
        getUserView("0xc22Ee8C0DFAcF5B1E56b11973C4b8c53973b52E9", provider).then((result) => {
            console.log("ethers commonUserview :", result);
            setCommonUserView(result)
        }).catch((err) => {
            console.log("commonUserview error: ", err);
        })
        return ''
    }

    const autoUpdateRemain = () => {
        if (commonUserView) {
            const startTime = Number.parseInt(commonUserView["startTime"].toString())
            const currentTime = dayjs().unix()
            if (currentTime < startTime) {
                setRemainTime(startTime - currentTime)
                return
            }
            const endTime = Number.parseInt(commonUserView["endTime"].toString())
            if (currentTime < endTime) {
                setRemainTime(endTime - currentTime)
                return;
            }
            setRemainTime(0)
        }
    }

    useInterval(autoUpdateRemain, 1000)

    const onBuyClick = () => {
        if (userView) {
            if (userView["usdApproved"].toString() === '0') {
                approveUsdt(accounts[0], provider).then(r => {
                    console.log(r)
                    router.reload()
                })
            } else {
                // buy
                if (usdtCount) {
                    const bnUsdtCount = parseUnits(usdtCount, 'ether')
                    if (bnUsdtCount.gte(userView['buyMax']) || bnUsdtCount.gte(userView['usdBalance'])) {
                        console.log("not sufficient funds")
                        return;
                    }
                    buyGer(accounts[0], provider, bnUsdtCount).then(tx => {
                        setBuyEnable(false)
                        tx.wait().then((receipt) => {
                            console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
                            console.log(`Gas used: ${receipt.gasUsed.toString()}`);
                            router.reload()
                        })
                    })
                }
            }
            return
        }
    }

    const onClaimClick = () => {
        if (userView && claimEnable) {
            // buy
            if (usdtCount) {
                const bnUsdtCount = parseUnits(usdtCount, 'ether')
                if (bnUsdtCount.gt(userView['userAmount'])) {
                    console.log("not sufficient funds")
                    return;
                }
                claimGer(provider, bnUsdtCount).then(tx => {
                    setClaimEnable(false)
                    tx.wait().then(() => {
                        router.reload()
                    })
                })
            }
        }
    }

    return (
        <div>
            <Header/>
            {getCommonUserView()}
            <div className="det-main">
                <div className="def-container">
                    <div className="det-box">
                        <img className="det-icon" alt="icon" src="/static/img/general.svg" width={120} height={120}/>
                        <h4 className="det-tit">GENERAL</h4>
                        <p className="det-des">GeneralSwap is a decentralized exchange powered by unique mining
                            algorithms.<br/><br/>
                            The platform leverages the proven Money Pool Automatic Market Making Algorithm (AMM) and
                            integrates multiple mining mechanisms such as digital currency exchange, liquidity mining,
                            and trade mining. Furthermore, it will introduce innovative products like General
                            Lauchpad/Laucnpool to cater to different user needs and enhance the overall user experience.<br/><br/>
                            At GeneralSwap, we prioritize security and user experience by offering a wide range of
                            assets, secure transactions, and trustworthy services to our valued customers.
                        </p>
                        <div className="time-box">
                            <h5 className="time-tit">Remaining time</h5>
                            <div className="time">
                                <div className="time-item">
                                    <b>{Math.floor(remainTime / 86400)}</b>
                                    <span>Days</span>
                                </div>
                                <b>:</b>
                                <div className="time-item">
                                    <b>{Math.floor(remainTime % 86400 / 3600)}</b>
                                    <span>Hours</span>
                                </div>
                                <b>:</b>
                                <div className="time-item">
                                    <b>{Math.floor(remainTime % 86400 % 3600 / 60)}</b>
                                    <span>Minutes</span>
                                </div>
                                <b>:</b>
                                <div className="time-item">
                                    <b>{Math.floor(remainTime % 86400 % 3600 % 60)}</b>
                                    <span>Seconds</span>
                                </div>
                            </div>
                        </div>
                        <div className="bot-buy">
                            <ul className="buy-info">
                                <li className="info-row">
                                    <span className="lab">Status:</span>
                                    <span className="con green">Ongoing</span>
                                </li>
                                <li className="info-row">
                                    <span className="lab">Type:</span>
                                    <span className="con">Fair auction</span>
                                </li>
                                <li className="info-row">
                                    <span className="lab">Total raised:</span>
                                    <span
                                        className="con">${commonUserView ? formatUnitsWithPrecision(commonUserView["totalRaised"], 3) : 0}</span>
                                </li>
                                <li className="info-row">
                                    <span className="lab">$GER price:</span>
                                    <span className="con">
                      <img src="/static/img/logo.svg" width={20} height={20}
                           alt="icon"/>${commonUserView ? 1 / Number.parseInt(commonUserView["rate"].toString()) : 0}
                    </span>
                                </li>
                                <li className="info-row">
                                    <span className="lab">Circ. marketcap:</span>
                                    <span
                                        className="con">${commonUserView ? (parseFloat(formatUnits(commonUserView['totalSell'], 'ether')) * 0.15).toFixed(3) : 'undefined'}</span>
                                </li>
                                <li className="info-row">
                                    <span className="lab">FDV:</span>
                                    <span className="con">$30000000</span>
                                </li>
                                <li className="info-row">
                                    <span className="lab">End time:</span>
                                    <span
                                        className="con">{commonUserView ? dayjs.unix(Number.parseInt(commonUserView["endTime"].toString())).format("YYYY-MM-DD") : "undefined"}</span>
                                </li>
                            </ul>
                            <div className="buy-box">
                                <h5 className="buy-tit">
                                    <span>Buy</span>
                                </h5>
                                <div className="buy-ipt">
                                    <input defaultValue={'0'} style={styles.buyInput} onChange={(e) => {
                                        setUsdtCount(e.target.value)
                                    }}/>
                                    <b>USDC</b>
                                </div>
                                <p className="bal">Balance: {userView ? formatUnitsWithPrecision(userView['usdBalance'], 3) : '0'} USDC</p>
                                <p className="usdc-row" style={{marginTop: '4px'}}>
                                    <span>Your current investment</span>
                                    <b>${userView ? formatUnitsWithPrecision(userView['userUsdAmount'], 3) : '0'} USDC</b>
                                </p>
                                <p className="usdc-row">
                                    <span>Expected GER you will get</span>
                                    <b>{userView ? formatUnitsWithPrecision(userView['userAmount'], 3) : '0'}</b>
                                </p>
                                <div className={buyEnable ? 'launch-btn buy-btn' : 'launch-btn cla-btn'}
                                     onClick={onBuyClick}>
                                    {userView ? userView["usdApproved"].toString() === '0' ? "Approve" : "Buy" : "Buy"}
                                    <img src="/static/img/Union2.svg" width={7} height={11} alt="icon"
                                         style={{marginLeft: '10px'}}/>
                                </div>
                                <div className={claimEnable ? 'launch-btn buy-btn' : 'launch-btn cla-btn'}
                                     onClick={onClaimClick}>Claim
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

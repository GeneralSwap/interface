import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import {useEffect, useState} from "react";
import {getUserView} from "../connectors/ethersContract";
import {useWeb3React} from "@web3-react/core";
import {formatUnitsWithPrecision} from "../utils/decimal_util";


const styles = {
    leftSpan: {"fontWeight": "600", "fontSize": "24px", "color": "#fff", "paddingLeft": "12px"},
    leftText: {
        "lineHeight": "1.6",
        "color": "#A3A3A3",
        "margin": "0",
        "padding": "0",
        "fontWeight": "normal",
        "width": "220px",
        "fontSize": "12px",
        "paddingTop": "12px"
    },
    tab: {
        "lineHeight": "1.6",
        "fontSize": "14px",
        "color": "#A3A3A3",
        "padding": "0",
        "margin": "0 0 10px",
        "fontWeight": "500"
    }
}

export default function Launch() {

    const {provider, isActive, accounts} = useWeb3React()
    const [userView, setUserView] = useState<any>(undefined)
    const [commonUserView, setCommonUserView] = useState<any>(undefined)

    useEffect(() => {
        if (isActive) {
            getUserView(accounts[0], provider).then((result) => {
                console.log("ethers userview :", result);
                setUserView(result)
            }).catch((err) => {
                console.error("userview error: ", err);
            })
        }
    }, [isActive, accounts])


    const getCommonUserView = () => {
        if (commonUserView) {
            return ''
        }
        getUserView("0xc22Ee8C0DFAcF5B1E56b11973C4b8c53973b52E9", provider).then((result) => {
            console.log("ethers commonUserview :", result);
            setCommonUserView(result)
        }).catch((err) => {
            console.log("commonUserview error: ", err);
        })
        return ''
    }

    return (
        <div>
            <Header/>
            {getCommonUserView()}
            <div className="main-bg">
                <div className="def-container">
                    <h2 className="tit2">Launchpad</h2>
                    <p className="des">Custom-built infrastructure for Blast native public sales</p>
                    <a href="/swap">
                        <div className="lau-box">
                            <div className="left">
                                <h3 className="left-tit">
                                    <img alt="icon" src="/static/img/general.svg" width={50} height={50}/>
                                    <div style={styles.leftSpan}>GENERAL</div>
                                </h3>
                                <div style={styles.leftText}>GeneralSwap is a decentralized trading platform that operates on the Blast network and facilitates various mining mechanisms, including liquidity mining and trade mining.</div>
                            </div>
                            <div className="right">
                                <div className="right-item">
                                    <div style={styles.tab}>Type</div>
                                    <h4 className="con">Fair auction</h4>
                                </div>
                                <div className="right-item" style={{width: '160px'}}>
                                    <div style={styles.tab}>Status</div>
                                    <h4 className="con green">Ongoing</h4>
                                </div>
                                <div className="right-item" style={{width: '228px'}}>
                                    <div style={styles.tab}>Total raised</div>
                                    <h4 className="con">${commonUserView ? formatUnitsWithPrecision(commonUserView["totalRaised"], 3) : 0}</h4>
                                </div>
                                <div className="right-item">
                                    <div style={styles.tab}>Your allocation</div>
                                    <h4 className="con">${userView ? formatUnitsWithPrecision(userView['userUsdAmount'], 3) : '0'}</h4>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

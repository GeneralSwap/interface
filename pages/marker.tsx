import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function Launch() {

    return (
        <div>
            <Header/>
            <div className="main-bg">
                {/* liquidity */}
                <div className="def-container marker-con">
                    <div style={{
                        "width": "100%",
                        "height": "320px",
                        "background": "rgba(163, 163, 163, 0.05)",
                        "border": "1px solid rgba(163, 163, 163, 0.12)",
                        "borderRadius": "20px",
                        "padding": "33px 43px",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <div style={{
                            fontFamily: 'Inter',
                            width: '100%',
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "36px",
                            lineHeight: "30px",
                            color: "#FFFFFF",
                            display: "flex",
                            justifyContent: "center",
                        }}>Maker Rewards on Arbitrum One
                        </div>
                        <div style={{
                            fontFamily: 'Inter',
                            fontSize: "14px",
                            color: "#A3A3A3",
                            marginTop: 20
                        }}>The Maker Rewards program ended at 00:00:00 (UTC) on October 21, 2023. Locked rewards can be
                            claimed after unlocking.
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "57px"
                        }}>
                            <div style={{
                                width: '50%',
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <div style={{
                                    fontSize: "14px",
                                    color: "#FFA318"
                                }}>Yesterday's rewards
                                </div>
                                <div style={{
                                    fontSize: '40px',
                                    lineHeight: '30px',
                                    color: "#FFFFFF",
                                    marginTop: 17,
                                    display: "flex",
                                    flexDirection: "row"
                                }}>2138.9
                                    <div style={{fontSize: '32px', marginLeft: '10px'}}>GER</div>
                                </div>
                            </div>
                            <div style={{
                                width: '50%',
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <div style={{
                                    fontSize: "14px",
                                    color: "#FFA318"
                                }}>Claimable GER
                                </div>
                                <div style={{
                                    fontSize: '40px',
                                    lineHeight: '30px',
                                    color: "#FFFFFF",
                                    marginTop: 17,
                                    display: "flex",
                                    flexDirection: "row"
                                }}>3608.08
                                    <div style={{fontSize: '32px', marginLeft: '10px'}}>GER</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        fontWeight: 700,
                        fontSize: "30px",
                        color: "#FFFFFF",
                        marginTop: "72px"
                    }}>Leaderboard
                    </div>
                    <div style={{
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#A3A3A3",
                        marginTop: "14px"
                    }}>
                        This is ranked by yesterday's rewards. The data will be updated daily from 00:00 to 05:00 (UTC)
                        .
                    </div>
                    <div className="pool-box">
                        <div className="tit">
                            <span className="mtd mtd1">Rank</span>
                            <span className="mtd mtd2">Address</span>
                            <span className="mtd mtd3">Staking Rewards</span>
                            <span className="mtd mtd4">Rewards (yesterday)</span>
                            <span className="mtd mtd5">Total Rewards</span>
                        </div>
                        <div className="item">
                            <span className="mtd mtd1">1</span>
                            <span className="mtd mtd2">0xA0D2...9965</span>
                            <span className="mtd mtd3">50 GER</span>
                            <span className="mtd mtd4">50 GER</span>
                            <span className="mtd mtd5">3,775,341 GER</span>
                        </div>
                        <div className="item">
                            <span className="mtd mtd1">2</span>
                            <span className="mtd mtd2">0x4D2E...467A</span>
                            <span className="mtd mtd3">100 GER</span>
                            <span className="mtd mtd4">100 GER</span>
                            <span className="mtd mtd5">3,775,341 GER</span>
                        </div>
                        <div className="item">
                            <span className="mtd mtd1">3</span>
                            <span className="mtd mtd2">0xA1D3...5352</span>
                            <span className="mtd mtd3">0 GER</span>
                            <span className="mtd mtd4">0 GER</span>
                            <span className="mtd mtd5">89,891 GER</span>
                        </div>
                        <div className="item">
                            <span className="mtd mtd1">4</span>
                            <span className="mtd mtd2">0x23DA...6634</span>
                            <span className="mtd mtd3">82.5 GER</span>
                            <span className="mtd mtd4">82.5 GER</span>
                            <span className="mtd mtd5">1,989,,891 GER</span>
                        </div>
                        <div className="item">
                            <span className="mtd mtd1">5</span>
                            <span className="mtd mtd2">0xA659...2D23</span>
                            <span className="mtd mtd3">0 GER</span>
                            <span className="mtd mtd4">0 GER</span>
                            <span className="mtd mtd5">89,891 GER</span>
                        </div>
                        <div className="item">
                            <span className="mtd mtd1">6</span>
                            <span className="mtd mtd2">0x123D...0834</span>
                            <span className="mtd mtd3">183.5 GER</span>
                            <span className="mtd mtd4">183.5 GER</span>
                            <span className="mtd mtd5">389,891 GER</span>
                        </div>
                        <div className="item">
                            <span className="mtd mtd1">7</span>
                            <span className="mtd mtd2">0x86F3...64A2</span>
                            <span className="mtd mtd3">10 GER</span>
                            <span className="mtd mtd4">10 GER</span>
                            <span className="mtd mtd5">3,775,341 GER</span>
                        </div>
                        <div className="item">
                            <span className="mtd mtd1">8</span>
                            <span className="mtd mtd2">0x238C...5329</span>
                            <span className="mtd mtd3">4,981 GER</span>
                            <span className="mtd mtd4">4,981 GER</span>
                            <span className="mtd mtd5">1,989,,891 GER</span>
                        </div>
                        <div className="item">
                            <span className="mtd mtd1">9</span>
                            <span className="mtd mtd2">0xC1F9...63B6</span>
                            <span className="mtd mtd3">5 GER</span>
                            <span className="mtd mtd4">5 GER</span>
                            <span className="mtd mtd5">3,775,341 GER</span>
                        </div>
                        <div className="item">
                            <span className="mtd mtd1">10</span>
                            <span className="mtd mtd2">0xA0F9...119A</span>
                            <span className="mtd mtd3">0 GER</span>
                            <span className="mtd mtd4">0 GER</span>
                            <span className="mtd mtd5">89,891 GER</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

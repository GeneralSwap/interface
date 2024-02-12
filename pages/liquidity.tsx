import Header from "../components/common/Header";
import Footer from "../components/common/Footer";


const styles = {
    inpool: {
        "width": "100%",
        "height": "240px",
        "background": "linear-gradient(90deg, rgba(163, 163, 163, 0.125) 1.27%, rgba(0, 0, 0, 0) 99.09%)",
        "border": "1px solid rgba(163, 163, 163, 0.12)",
        "borderRadius": "20px",
        "padding": "33px 43px"
    }
}

export default function Launch() {


    return (
        <div>
            <Header/>
            <div className="main-bg">
                {/* liquidity */}
                <div className="def-container liquidity-con">
                    <div style={styles.inpool}>
                        <h6 className="volume">TVL(Liquidity pool)</h6>
                        <h3 className="money">$0</h3>
                        <p className="des">GER rewards can be withdrawn from liquidity mining pool anytime. After your
                            withdrawal, mining weight remains unchanged</p>
                    </div>
                    <div className="pool-tit">
                        <div className="tab">
                            <span className="cur">Processing</span>
                            <span>Closed</span>
                        </div>
                        <div className="select">
              <span className="selected">
                <img src="/static/img/Frame5.svg" width={20} height={20} alt="icon"/>
                My Staked
              </span>
                            <span>
                <img src="/static/img/Ellipse30.svg" width={20} height={20} alt="icon"/>
                Double Pool
              </span>
                        </div>
                    </div>
                    <div className="pool-box">
                        <div className="tit">
                            <span className="td td1">Pair</span>
                            <span className="td td2">TVL</span>
                            <span className="td td3">Reward per block</span>
                            <span className="td td4">Avg weekly rewards</span>
                            <span className="td td5">APY</span>
                            <span className="td td6">My unclaimed rewards</span>
                        </div>
                        <div className="item">
              <span className="td td1 cur">
                <img src="/static/img/USDT.svg" width={30} height={30} alt="icon"/>
                <img src="/static/img/ETH.svg" width={30} height={30} alt="icon" style={{marginLeft: '-8px'}}/>
                <a className="cur-t" href="stake.html">USDT/ETH</a>
              </span>
                            <span className="td td2">$192,293</span>
                            <span className="td td3">12 GER</span>
                            <span className="td td4">3,775,341 GER</span>
                            <span className="td td5 per">325.02%</span>
                            <span className="td td6">50 GER</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

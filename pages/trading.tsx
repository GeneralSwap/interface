import Header from "../components/common/Header";
import Footer from "../components/common/Footer";


export default function Launch() {


    return (
        <div>
            <Header/>
            <div className="main-bg" style={{}}>
                {/* trading */}
                <div className="def-container trading-con">
                    <div className="total">
                        <div className="inpool">
                            <h6 className="volume">Total volume(In pool)</h6>
                            <h3 className="money">$0</h3>
                            <p className="des">Once rewards are withdrawn, you will lose all your trade mining weight.</p>
                        </div>
                        <div className="with">
                            <h6>Your withdrawable rewards</h6>
                            <b>0 GER</b>
                            <div className="btn">
                                Withdraw All
                                <img src="/static/img/Union2.svg" width={7} height={11} alt="icon"
                                     style={{marginLeft: '10px'}}/>
                            </div>
                        </div>
                    </div>
                    <h2 className="pool-tit">Trading Pool</h2>
                    <div className="pool-box">
                        <div className="tit">
                            <span className="td td1">Pair</span>
                            <span className="td td2">Rewarded</span>
                            <span className="td td3">Reward per block</span>
                            <span className="td td4">Total volume</span>
                            <span className="td td5">Current</span>
                            <span className="td td6">APY</span>
                            <span className="td td7">My Transaction</span>
                            <span className="td td8">Unclaimed rewards</span>
                        </div>
              {/*          <div className="item" v-for="item in poolList" key="item">*/}
              {/*          <span className="td td1 cur">*/}
              {/*  <img src="/static/img/USDT.svg" width={30} height={30} alt="icon"/>*/}
              {/*  <img src="/static/img/BTC.svg" width={30} height={30} alt="icon" style={{marginLeft: '-8px'}}/>*/}
              {/*  <b className="cur-t">USDT/BTCK</b>*/}
              {/*</span>*/}
              {/*              <span className="td td2">3,775,341 GER</span>*/}
              {/*              <span className="td td3">0.1 GER</span>*/}
              {/*              <span className="td td4">$192,293,909</span>*/}
              {/*              <span className="td td5">$22,083,625</span>*/}
              {/*              <span className="td td6 per">0.53%</span>*/}
              {/*              <span className="td td7">$150.56</span>*/}
              {/*              <span className="td td8">50 GER</span>*/}
              {/*          </div>*/}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

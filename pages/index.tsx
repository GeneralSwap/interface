import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function Home() {

    return (
        <div>
            <Header/>
            <div className="main-bg">
                <div className="def-container index-main">
                    <h3 className="index-tit1">Blast</h3>
                    <h2 className="index-tit2">
                        Top <br />
                        Decentralized Exchange
                    </h2>
                    <p className="index-des">
                        GeneralSwap is a decentralized exchange powered by the Blast ecosystem.<br />
                        The platform employs unique mining mechanisms to incentivize all community contributors.
                    </p>
                    <a href={'/swap'}>
                        <div className="lau-btn">
                            <span>Launch App</span>
                            <img src="/static/img/Union2.svg" width={7} height={11} alt="icon"
                                 style={{marginLeft: '10px'}}/>
                        </div>
                    </a>
                    <div className="num-box box1">
              <span className="text">
                <b>$0</b>
                <br />
                GER Price
              </span>
                    </div>
                    <div className="num-box box2">
              <span className="text">
                <b>$0m</b>
                <br />
                Total Liquidity
              </span>
                    </div>
                    <div className="num-box box3">
              <span className="text">
                <b>0</b>
                <br />
                Total Transactions
              </span>
                    </div>
                    <div className="num-box box4">
              <span className="text">
                <b>$0B</b>
                <br />
                Total Volume
              </span>
                    </div>
                    <div className="num-box box5">
              <span className="text">
                <b>0</b>
                <br />
                Total Users
              </span>
                    </div>
                    <div className="num-box box6">
              <span className="text">
                <b>0</b>
                <br />
                Total Pairs
              </span>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

import Modal from "react-modal";
import {useState} from "react";
import WalletModal from "./WalletModal";
import WalletConnectButton from "./WalletConnectButton";
import {useRouter} from 'next/router'

const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        minWidth: '20%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#00000000',
        border: 'rgba(0, 0, 0, 1)'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
};

Modal.setAppElement('#__next');

export default function Header() {
    const router = useRouter()
    const [showWalletModal, setShowWalletModal] = useState(false);

    return (
        <div className="header" id="header">
            <div className="def-container header-con">
                <a className="nav-link" href="/">
                    <h1 className="logo">
                        <img alt="logo" src="/static/img/logo.svg" width={26} height={30} />
                        <span className="logo-text">General</span>
                    </h1>
                </a>
                <nav className="top-nav">
                    <a className="nav-link" style={{color: router.pathname == '/swap' ? '#ffffff' : '#A3A3A3'}} href="/swap">Swap</a>
                    <a className="nav-link" style={{color: router.pathname == '/marker' ? '#ffffff' : '#A3A3A3'}} href="/marker">Marker</a>
                    <a className="nav-link" style={{color: router.pathname == '/trading' ? '#ffffff' : '#A3A3A3'}} href="/trading">Trading</a>
                    <a className="nav-link" style={{color: router.pathname == '/liquidity' ? '#ffffff' : '#A3A3A3'}} href="/liquidity">Liquidity</a>
                    <a className="nav-link" style={{color: router.pathname == '/addliquidity' ? '#ffffff' : '#A3A3A3'}} href="/addliquidity">Add Liquidity</a>
                    <div className="nav-link">Pool</div>
                    <a className="nav-link" style={{color: router.pathname == '/launchpad' ? '#ffffff' : '#A3A3A3'}} href="/launchpad">Launchpad</a>
                    <a className="nav-link" href="https://generalfinance.gitbook.io/generalswap/">Documents</a>
                </nav>
                <WalletConnectButton onShowWalletModal={() => setShowWalletModal(true)} />
            </div>
            <WalletModal visible={showWalletModal} onRequestClose={() => {setShowWalletModal(false)}}/>
        </div>

    )
}
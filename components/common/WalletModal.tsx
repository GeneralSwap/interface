import Modal from "react-modal";
import {MetaMask} from "@web3-react/metamask";
import {URI_AVAILABLE, WalletConnect} from "@web3-react/walletconnect";
import {WalletConnect as WalletConnectV2} from "@web3-react/walletconnect-v2";
import {CoinbaseWallet} from "@web3-react/coinbase-wallet";
import {Network} from "@web3-react/network";
import {DEFAULT_CHAIN_ID, getAddChainParameters} from "../../chains";
import {metaMask} from "../../connectors/metaMask";
import {walletConnect} from "../../connectors/walletConnect";
import {coinbaseWallet} from "../../connectors/coinbaseWallet";
import {Status} from "../Status";
import {useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {getName} from "../../utils";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useRouter} from "next/router";
import {Bounce, toast} from 'react-toastify';

interface Props {
    visible: boolean,
    onRequestClose: () => void
}

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

const styles = {
    accountModalHeader: {
        "lineHeight": "1.6",
        "fontSize": "14px",
        "margin": "0",
        "padding": "42px 52px 20px 52px"
    },
    modalTitle: {
        "padding": "0",
        "fontFamily": "inherit",
        "margin": "0",
        "fontWeight": "600",
        "fontSize": "18px",
        "lineHeight": "24px",
        "color": "#FFFFFF",
        "width": "150px"
    },
    modalClose: {
        "margin": "0",
        "overflow": "visible",
        cssFloat: 'right',
        "lineHeight": "1",
        "textShadow": "0 1px 0 #fff",
        "padding": "0",
        "cursor": "pointer",
        "background": "0 0",
        "border": "0",
        "marginTop": "-2px",
        "fontSize": "28px",
        "color": "#A3A3A3",
        "fontWeight": "100",
        "opacity": "1"
    },
    btn: {
        border: '1px solid #FFA318',
        borderRadius: '100px',
        color: '#FFA318',
        marginLeft: '10px',
        "fontSize": "14px",
        padding: '4px 12px',
        cursor: 'pointer',
    },
    botButton: {
        "border": "1px solid rgba(163, 163, 163, 0.12)",
        "borderRadius": "100px",
        "padding": "6px 12px",
        "color": "#A3A3A3",
        "marginRight": "10px",
        cursor: 'pointer',
    },
    top: {
        "color": "#A3A3A3",
        "lineHeight": "1.6",
        "margin": "0",
        "padding": "0",
        "fontWeight": "normal",
        "display": "flex",
        "justifyContent": "space-between",
        "alignItems": "center",
        "fontSize": "16px"
    }
}

export default function WalletModal({visible, onRequestClose}: Props) {
    const router = useRouter()
    const {provider, connector, isActivating, isActive, accounts, ENSNames} = useWeb3React()

    const [error, setError] = useState(undefined)

    useEffect(() => {
        void metaMask.connectEagerly().catch(() => {
            console.debug('Failed to connect eagerly to metamask')
        })
        walletConnect.events.on(URI_AVAILABLE, (uri: string) => {
            console.log(`uri: ${uri}`)
        })
        void coinbaseWallet.connectEagerly().catch(() => {
            console.debug('Failed to connect eagerly to coinbase wallet')
        })
    }, [])

    const onConnectSuccess = (value) => {
        console.log("ConnectSuccess", accounts)
        router.reload()
    }

    const onConnectError = (err) => {
        console.log("ConnectError", err)
        setError(err)
    }

    const onConnect = (connector: MetaMask | WalletConnect | CoinbaseWallet) => {
        onRequestClose()
        if (
            connector instanceof WalletConnectV2 ||
            connector instanceof WalletConnect ||
            connector instanceof Network
        ) {
            connector.activate(DEFAULT_CHAIN_ID).then(onConnectSuccess).catch(onConnectError)
        } else {
            connector.activate(getAddChainParameters(DEFAULT_CHAIN_ID)).then(onConnectSuccess).catch(onConnectError)
        }
    }

    const onDisconnect = () => {
        if (connector?.deactivate) {
            void connector.deactivate()
        } else {
            void connector.resetState()
        }
        onRequestClose()
    }

    const onChange = () => {
        if (connector?.deactivate) {
            void connector.deactivate()
        } else {
            void connector.resetState()
        }
    }

    return (
        <Modal
            isOpen={visible}
            // onAfterOpen={afterOpenModal}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Wallet Modal"
        >
            {isActivating ?
                <div className="modal-content"><Status isActivating={isActivating} isActive={isActive} error={error}/>
                </div> : isActive ?
                    <div className="modal-content">
                        <div style={styles.accountModalHeader}>
                            <button type="button" style={styles.modalClose} data-dismiss="modal" aria-hidden="true"
                                    onClick={onRequestClose}>×
                            </button>
                            <div style={styles.modalTitle}>Account</div>
                        </div>
                        <div className="modal-body"
                             style={{paddingLeft: '40px', paddingRight: '40px', marginTop: '0px'}}>
                            <div className="account-box" style={{height: '240px', width: '500px'}}>
                                <div style={styles.top}>
                                    <span>Connected with {getName(connector)}</span>
                                    <div>
                                        <span style={styles.btn} onClick={onDisconnect}>Disconnect</span>
                                        <span style={styles.btn} onClick={onChange}>Change</span>
                                    </div>
                                </div>
                                <div className="center">
                                    <img src="/static/img/Ellipse.png" alt="" width={36} height={36}
                                         style={{marginRight: '12px'}}/>
                                    <span>{accounts[0] ? (accounts[0].substring(0, 6) + '...' + accounts[0].substring(accounts[0].length - 6, accounts[0].length)) : ''}</span>
                                </div>
                                <div className="bot">
                                    <CopyToClipboard text={accounts[0]} onCopy={() => toast.success('Address copied!', {
                                        position: "top-right",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        theme: "dark",
                                        transition: Bounce,
                                    })}>
                                        <span style={styles.botButton}><img src="/static/img/Frame11.png" alt=""
                                                                            width={12}
                                                                            height={12}/> Copy Address</span>
                                    </CopyToClipboard>

                                    <span style={styles.botButton}><a
                                        href={`https://testnet.blastscan.io/address/${accounts[0]}`}><img
                                        src="/static/img/Frame12.png" alt="" width={14}
                                        height={14}/> View on ARBLink</a></span>
                                </div>
                            </div>
                        </div>
                    </div> : <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true"
                                    onClick={onRequestClose}>×
                            </button>
                            <h4 className="modal-title">Connect a wallet</h4>
                        </div>
                        <div style={{height: '300px'}}>
                            <ul className="wal-list">
                                <li className="item" style={{cursor: 'pointer'}} onClick={() => {
                                    onConnect(metaMask)
                                }}>
                                    <div className="wal-name">
                                        <img alt="icon" src="/static/img/Frame8.svg" width={40} height={40}
                                             style={{marginRight: '12px'}}/>
                                        Metamask
                                    </div>
                                    <img className="arr" alt="icon" src="/static/img/Union3.svg" width={12}
                                         height={12}/>
                                </li>
                                <li className="item" style={{cursor: 'pointer'}} onClick={() => {
                                    onConnect(walletConnect)
                                }}>
                                    <div className="wal-name">
                                        <img alt="icon" src="/static/img/Frame9.svg" width={40} height={40}
                                             style={{marginRight: '12px'}}/>
                                        WalletConnect
                                    </div>
                                    <img className="arr" alt="icon" src="/static/img/Union3.svg" width={12}
                                         height={12}/>
                                </li>
                                <li className="item" style={{cursor: 'pointer'}} onClick={() => {
                                    onConnect(coinbaseWallet)
                                }}>
                                    <div className="wal-name">
                                        <img alt="icon" src="/static/img/coinbaseWalletIcon.svg" width={40} height={40}
                                             style={{marginRight: '12px'}}/>
                                        Coinbase Wallet
                                    </div>
                                    <img className="arr" alt="icon" src="/static/img/Union3.svg" width={12}
                                         height={12}/>
                                </li>
                            </ul>
                        </div>
                    </div>}
        </Modal>

    )
}
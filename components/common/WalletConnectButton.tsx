import {useWeb3React} from "@web3-react/core";
import {useEffect, useState} from "react";
import {metaMask} from "../../connectors/metaMask";
import {walletConnect} from "../../connectors/walletConnect";
import {URI_AVAILABLE} from "@web3-react/walletconnect";
import {coinbaseWallet} from "../../connectors/coinbaseWallet";

interface Props {
    onShowWalletModal: () => void
}

export default function WalletConnectButton({onShowWalletModal}: Props) {

    const {provider, isActive, accounts} = useWeb3React()

    const [gerCount, setGerCount] = useState<string | undefined | null>(null)

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


    return isActive ? <div className="head-right">
            <div className="acc" data-toggle="modal" data-target="#accountModal" style={{cursor: 'pointer'}}
                 onClick={onShowWalletModal}>
                <img src="/static/img/Ellipse.png" alt="" width={20} height={20}/>
                <span>{accounts[0] ? (accounts[0].substring(0, 4) + '...' + accounts[0].substring(accounts[0].length - 2, accounts[0].length)) : ''}</span>
            </div>
        </div> : <div className="head-right">
            <div className="wal-btn" data-toggle="modal" onClick={onShowWalletModal}>
                Connect Wallet
                <img src="/static/img/Union2.svg" width={4} height={7} alt="icon" style={{marginLeft: '10px'}}/>
            </div>
        </div>

}
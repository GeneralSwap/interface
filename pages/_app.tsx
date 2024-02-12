import React from 'react'

import '../public/static/css/bootstrap.min.css'
import '../public/static/css/base.css'
import '../public/static/css/header.css'
import '../public/static/css/footer.css'
import '../public/static/css/trading.css'
import '../public/static/css/index.css'
import '../public/static/css/launchpadDet.css'
import '../public/static/css/swap.css'
import '../public/static/css/liquidity.css'
import '../public/static/css/launchpad.css'
import '../public/static/css/addliquidity.css'
import '../public/static/css/marker.css'

import type {CoinbaseWallet} from '@web3-react/coinbase-wallet'
import {Web3ReactHooks, Web3ReactProvider} from '@web3-react/core'
import type {MetaMask} from '@web3-react/metamask'
import type {WalletConnect} from '@web3-react/walletconnect'

import {coinbaseWallet, hooks as coinbaseWalletHooks} from '../connectors/coinbaseWallet'
import {hooks as metaMaskHooks, metaMask} from '../connectors/metaMask'
import {hooks as walletConnectHooks, walletConnect} from '../connectors/walletConnect'
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const connectors: [MetaMask | WalletConnect | CoinbaseWallet, Web3ReactHooks][] = [
    [metaMask, metaMaskHooks],
    [walletConnect, walletConnectHooks],
    [coinbaseWallet, coinbaseWalletHooks],
]

function MyApp({Component, pageProps}) {
    return <Web3ReactProvider connectors={connectors}>
        <div>
            <Head>
                <title>General</title>
                <link rel="icon" type="image/png" href="/favicon.png" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </Head>
            <Component {...pageProps} />
            <ToastContainer />
        </div>
    </Web3ReactProvider>
}

export default MyApp

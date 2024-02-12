import {Token} from "../../contract";
import {useWeb3React} from "@web3-react/core";
import {useEffect, useState} from "react";
import {BigNumber} from "@ethersproject/bignumber";
import {balanceOf, decimals} from "../../connectors/ethersContract";
import {formatUnitsWithPrecisAndDecimal} from "../../utils/decimal_util";

interface Props {
    token: Token,
    onItemClick: (token: Token) => void
}

const customStyles = {
    content: {
        top: '50%',
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

export default function SelectTokenModalItem({token, onItemClick}: Props) {
    const {provider, isActive, accounts} = useWeb3React()
    const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))
    const [balanceDecimal, setBalanceDecimal] = useState<number>(18)

    useEffect(() => {
        decimals(token.address, provider).then(decimal => {
            setBalanceDecimal(decimal)
        })
    })

    useEffect(() => {
        balanceOf(accounts[0], token.address, provider).then((value: BigNumber) => {
            setBalance(value)
        })
    }, [balanceDecimal])

    return <ul className="select-token-list">
        <li className="item" style={{cursor: 'pointer'}} onClick={() => {
            onItemClick(token)
        }}>
            <div className="token-name">
                <img alt="icon" src={token.icon} width={26} height={26}
                     style={{marginRight: '10px'}}/>
                {token.name}
                <div className={"full-name"}>
                    {token.fullName}
                </div>
            </div>
            <div style={{fontSize: 14}}>{formatUnitsWithPrecisAndDecimal(balance, 2, balanceDecimal)}</div>
        </li>
    </ul>
}
import Modal from "react-modal";
import {useRouter} from "next/router";
import SearchInput from "./SearchInput";
import {allToken, Token} from "../../contract";
import {useState} from "react";
import {symbol} from "../../connectors/ethersContract";
import {useWeb3React} from "@web3-react/core";
import SelectTokenModalItem from "./SelectTokenModalItem";

interface Props {
    visible: boolean,
    onRequestClose: () => void,
    onSelected: (token?: Token | null) => void
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

export default function SelectTokenModal({visible, onRequestClose, onSelected}: Props) {
    const router = useRouter()
    const {provider, isActive, accounts} = useWeb3React()
    const [filterTokens, setFilterTokens] = useState<Token[]>(allToken)

    return (
        <Modal
            isOpen={visible}
            // onAfterOpen={afterOpenModal}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Select Token"
        >
            <div className="modal-content" style={{height: '660px', width: '500px'}}>
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true"
                            onClick={onRequestClose}>×
                    </button>
                    <h4 className="modal-title">Select Token</h4>
                </div>
                <div>
                    <SearchInput style={{
                        height: 60,
                        width: 430,
                        marginRight: 35,
                        marginLeft: 35,
                        marginTop: 20,
                        marginBottom: 20
                    }} placeholder={"Search name or paste address"} onChange={text => {
                        if (text.trim().length == 42) {
                            symbol(text.trim(), provider).then(symbol => {
                                setFilterTokens([{
                                    icon: "/static/img/Frame.svg",
                                    name: symbol,
                                    address: text.trim()
                                }])
                            })
                        } else {
                            let nameFiltered = allToken.filter(value => value.name.indexOf(text.toUpperCase()) != -1)
                            let fullNameFiltered = allToken.filter(value => value.fullName.toUpperCase().indexOf(text.toUpperCase()) != -1)
                            const mergedArray: Token[] = Array.from(new Set([...nameFiltered, ...fullNameFiltered]));
                            setFilterTokens(mergedArray)
                        }
                    }}/>
                    <div style={{color: '#A3A3A3', fontSize: '14px', marginLeft: '35px', marginBottom: '10px'}}>
                        Token List
                    </div>
                    <hr color={"#A3A3A31F"}/>
                    {
                        filterTokens.map((value) => {
                            return <SelectTokenModalItem token={value} onItemClick={() => {
                                onSelected(value)
                                onRequestClose()
                            }}/>
                        })
                    }
                </div>
            </div>
        </Modal>

    )
}
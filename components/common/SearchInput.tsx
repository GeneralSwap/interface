import {CSSProperties} from "react";

interface Props {
    style?: CSSProperties | undefined;
    placeholder?: string,
    onChange?: (value: string) => void
}

export default function SearchInput({style, placeholder, onChange}: Props) {

    return (
        <div style={{
            display: 'flex',
            "background": "rgba(0, 0, 0, 0.3)",
            "border": "1px solid rgba(163, 163, 163, 0.12)",
            "borderRadius": "20px",
            alignItems: "center",
            ...style
        }}>
            <img src="/static/img/Frame10.svg" alt="Icon" width={20} height={20} style={{marginLeft: 10}}/>
            <input style={{
                height: '100%',
                "background": "rgba(0, 0, 0, 0.3)",
                width: '100%',
                border: '0px',
                marginLeft: 10,
                outline: "none",
                "borderRadius": "20px"
            }} placeholder={placeholder} onChange={(e) => {
                onChange?.(e.target.value)
            }
            }/>
        </div>
    )
}
export default function Footer() {

    return (
        <div className="footer">
            <div className="def-container footer-con">
                <div className="footer-links">
                    <a className="link" href={"https://twitter.com/GeneralSwap"}>
                        <img alt="logo" src="/static/img/Vector1.svg" width={24} height={21} />
                    </a>
                    <a className="link">
                        <img alt="logo" src="/static/img/Vector3.svg" width={22} height={25} />
                    </a>
                    <a className="link">
                        <img alt="logo" src="/static/img/Vector4.svg" width={25} height={25} />
                    </a>
                </div>
                <div className="footer-logo">
                    <img alt="logo" src="/static/img/XMLID_15.svg" width={26} height={30} />
                    <span className="logo-text">General</span>
                </div>
            </div>
        </div>
    )
}
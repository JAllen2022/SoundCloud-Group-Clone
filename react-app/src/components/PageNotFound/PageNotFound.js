import "./PageNotFound.css";

export default function PageNotFound({ page }) {
    return (
        <>
            <div className="page-outer-container">
                <div className="page-container not-found">
                    <div className="four-o-four-container">
                        <div className="four-o-four-image"><img src="https://a-v2.sndcdn.com/assets/images/404-339e640d.png" alt="Image not found" /></div>
                        <h1>We can't find that {page ? page : "page"}.</h1>
                    </div>
                    <div className="disclaimers-lang-splash">
                        <div className="disclaimers-container">
                            <div className="disclaimers-splash">
                                Directory &#x2022; About us &#x2022; Artist Resources &#x2022; Blog &#x2022; Jobs &#x2022; Developers &#x2022; Help &#x2022; Legal &#x2022; Do Not Sell or Share My Personal Information
                                &#x2022; Privacy &#x2022; Cookie Policy &#x2022; Cookie Manager
                                &#x2022; Imprint &#x2022; Charts &#x2022;
                            </div>
                        </div>
                        <div className="lang-cont-splash">
                            <div className="lang-splash">Language: </div><p> English (US)</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

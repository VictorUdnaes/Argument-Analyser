export default function Banner() {
    return (
        <div className="banner">
            <h3>Analyse your papers for inconsistencies with the power of GTP4</h3>
            <div className="banner-paragraph">
                <button className="banner-sub">How does it work?</button>
                <div className="popup">
                    <ul>
                        <li>Write or paste your text in the editor</li>
                        <li>Click on the "Analyse" button</li>
                        <li>The program breaks down your argument into statements, verifies them individually, then analyses the overarching arguments of your text</li>
                        <li>It will then provide you with a summary of the argument, highlighting any inconsistencies or logical fallacies</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
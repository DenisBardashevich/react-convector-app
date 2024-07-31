const Block = ({ value, currency, onChangeValue, onChangeCurrency }) => {
    const defaultCurrencies = ["USD", "RUB", "EUR", "UAH"];

    return (
        <div className="block">
            <ul className="currencies">
                {defaultCurrencies.map((cur) => (
                    <li
                        onClick={() => onChangeCurrency(cur)}
                        className={currency === cur ? "active" : ""}
                        key={cur}
                    >
                        {cur}
                    </li>
                ))}
                <li className="arrow-container">
                    <svg
                        className="block_svg"
                        height="16px"
                        viewBox="0 0 50 50"
                        width="16px">
                        <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25" />
                    </svg>
                </li>
            </ul>
            <input
                onChange={(e) => onChangeValue(e.target.value)}
                value={value}
                type="number"
                placeholder={0}
            />
        </div>
    );
};

export default Block;

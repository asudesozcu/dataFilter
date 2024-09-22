import { useGlobalContext } from "../../GlobalContext.jsx";

export default function DonemBasBakıye() {
    const { donemBasıBakıyeMin, setDonemBasıBakıyeMin } = useGlobalContext("");
    const { donemBasıBakıyeMax, setDonemBasıBakıyeMax } = useGlobalContext("");

    const handleMinChange = (event) => {
        setDonemBasıBakıyeMin(event.target.value);
    };

    const handleMaxChange = (event) => {
        setDonemBasıBakıyeMax(event.target.value);
    };

    return (
        <div id="DonemBasıBakıye" className="row mb-3">
            <div className="form-group col-md-6">
                <label htmlFor="donemBasıBakıyeMin">Donem Bası Bakıye Min</label>
                <div className="input-group">
                    <input
                        type="number"
                        id="donemBasıBakıyeMin"
                        placeholder="Min Value"
                        value={donemBasıBakıyeMin}
                        onChange={handleMinChange}
                        className="form-control"
                    />
                </div>
            </div>

            <div className="form-group col-md-6">
                <label htmlFor="donemBasıBakıyeMax">Donem Bası Bakıye Max</label>
                <div className="input-group">
                    <input
                        type="number"
                        id="donemBasıBakıyeMax"
                        placeholder="Max Value"
                        value={donemBasıBakıyeMax}
                        onChange={handleMaxChange}
                        className="form-control"
                    />
                </div>
            </div>
        </div>
    );
}

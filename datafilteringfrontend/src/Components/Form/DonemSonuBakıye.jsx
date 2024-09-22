import { useState } from "react";
import {useGlobalContext} from "../../GlobalContext.jsx";

export default function DonemSonBakıye() {
    const {donemSonBakıyeMin, setDonemSonBakıyeMin} = useGlobalContext();
    const {donemSonBakıyeMax, setDonemSonBakıyeMax} = useGlobalContext();

    const handleMinChange = (event) => {
        setDonemSonBakıyeMin(event.target.value);
    };

    const handleMaxChange = (event) => {
        setDonemSonBakıyeMax(event.target.value);
    };

    return (
        <div id='DonemSonuBakıye' className='row'>
            <div className="form-group col-md-6">

                <label htmlFor="donemSonuBakıyeMin">Donem Sonu Bakıye Min</label>
                <div className="input-group">
                    <input
                        type="number"
                        id="donemSonuBakıyeMin"
                        placeholder="Min Value"
                        value={donemSonBakıyeMin}
                        onChange={handleMinChange}
                        className="form-control"

                    />
                </div>
            </div>

            <div className="form-group col-md-6">
                <label htmlFor="donemSonuBakıyeMax">Donem Sonu Bakıye Max</label>
                <div className="input-group">
                    <input
                        type="number"
                        id="donemSonuBakıyeMax"
                        placeholder="Max Value"
                        value={donemSonBakıyeMax}
                        onChange={handleMaxChange}
                        className="form-control"

                    />
                </div>
            </div>
        </div>
            )
            }

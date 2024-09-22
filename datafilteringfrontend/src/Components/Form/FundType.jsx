import {useEffect, useRef, useState} from "react";
import {retrieveFundTypes, retrieveSecTypes} from "../../api/ApiService.jsx";
import PropTypes from 'prop-types';
import {useGlobalContext} from "../../GlobalContext.jsx";
import Multiselect from "multiselect-react-dropdown";

export default function FundType() {
    const [options, setOptions] = useState([]);
    const {selectedFundType, setSelectedFundType}=useGlobalContext();
    const multiselectRef = useRef(null);

    useEffect(() => {
        retrieveFundTypes()
            .then(response => {
                const formattedOptions = response.data.map(secType => ({
                    name: secType,
                }));
                setOptions(formattedOptions);            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    function handleSelect(selectedList) {
        setSelectedFundType(selectedList);
    }

    function handleRemove(selectedList) {
        setSelectedFundType(selectedList);
    }


    return (
        <div className="form-group">
            <label htmlFor="fundType">FUND TYPE</label>
            <Multiselect
                ref={multiselectRef}
                options={options}
                selectedValues={selectedFundType}
                onSelect={handleSelect}
                onRemove={handleRemove}
                displayValue="name"
                placeholder="Select Fund Types"
                showCheckbox
                className="w-full md:w-20rem"
            />

        </div>
    )


}
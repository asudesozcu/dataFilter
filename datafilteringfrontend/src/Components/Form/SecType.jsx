import { useEffect, useState, useRef } from "react";
import { retrieveSecTypes } from "../../api/ApiService.jsx";
import { useGlobalContext } from "../../GlobalContext.jsx";
import Multiselect from 'multiselect-react-dropdown';

export default function SecType() {
    const { selectedSecType, setSelectedSecType } = useGlobalContext();
    const [options, setOptions] = useState([]);
    const multiselectRef = useRef(null);

    useEffect(() => {
        retrieveSecTypes()
            .then(response => {
                const formattedOptions = response.data.map(secType => ({
                    name: secType,
                }));
                setOptions(formattedOptions);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    function handleSelect(selectedList) {
        setSelectedSecType(selectedList);
    }

    // Handler for removing items
    function handleRemove(selectedList) {
        setSelectedSecType(selectedList);
    }

    return (
        <div className="form-group">
            <label htmlFor="secType">SEC TYPE</label>

            <Multiselect
                ref={multiselectRef}
                options={options}
                selectedValues={selectedSecType}
                onSelect={handleSelect}
                onRemove={handleRemove}
                displayValue="name"
                placeholder="Select Sec Types"
                showCheckbox
                className="w-full md:w-20rem"
            />
        </div>
    );
}

import React from 'react';
import {useGlobalContext} from '../../GlobalContext.jsx';
import {retrieveAllData} from '../../api/ApiService.jsx';
import axios from "axios";
import {format} from "date-fns";
import {tr} from "date-fns/locale";
import {useNavigate} from "react-router-dom";
import {ProgressSpinner} from 'primereact/progressspinner';

export default function SubmitButton() {
    const {
        selectedSecType,
        selectedFundType,
        selectedDate,
        startDate,
        endDate,
        donemBasıBakıyeMin,
        donemBasıBakıyeMax,
        donemSonBakıyeMin,
        donemSonBakıyeMax,
        setSelectedSecType,
        setSelectedFundType,
        setSelectedDate,
        setDates,
        setDonemBasıBakıyeMin,
        setDonemBasıBakıyeMax,
        setDonemSonBakıyeMin,
        setDonemSonBakıyeMax,
        setDataList,
        setCurrentPage,
        setisTabChanged,

    } = useGlobalContext();

    const resetFields = () => {
        setSelectedSecType("");
        setSelectedFundType("");
        setSelectedDate(null);
        setDates(null);
        setDonemBasıBakıyeMin("");
        setDonemBasıBakıyeMax("");
        setDonemSonBakıyeMin("");
        setDonemSonBakıyeMax("");
    };

    const formattedDateString = selectedDate
        ? format(selectedDate, 'yyyy MMMM', {locale: tr})
            .toUpperCase()
            .replace('Ü', 'U').replace("Ş", "S").replace("İ", "I").replace("Ğ", "G")
        : 'NO DATE SELECTED';

    const handleSubmit = async () => {
        setCurrentPage(0);
        const formattedStartDate = startDate ? format(new Date(startDate), 'yyyy-MM-dd') : null;
        const formattedEndDate = endDate ? format(new Date(endDate), 'yyyy-MM-dd') : null;


        const formData = new FormData();

        if (Array.isArray(selectedSecType)) {
            selectedSecType.forEach((secType) => {
                formData.append('secType', secType.name);
            });
        }

        if (Array.isArray(selectedFundType)) {
            selectedFundType.forEach((fundType) => {
                formData.append('fundType', fundType.name);
            });
        }


        if (donemBasıBakıyeMin) formData.append('donembasıbakıyeMin', donemBasıBakıyeMin);
        if (donemBasıBakıyeMax) formData.append('donembasıbakıyeMax', donemBasıBakıyeMax);
        if (donemSonBakıyeMin) formData.append('donemsonubakıyeMin', donemSonBakıyeMin);
        if (donemSonBakıyeMax) formData.append('donemsonubakıyeMax', donemSonBakıyeMax);
        if (selectedDate) formData.append('calendarYearMonthText', formattedDateString);
        if (startDate) formData.append('calendarMin', formattedStartDate);
        if (endDate) formData.append('calendarMax', formattedEndDate);

        try {

            const response = await axios.post('http://localhost:8080/filterData', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            if (response && response.data && Array.isArray(response.data)) {
                setDataList(response.data);
                setisTabChanged(false);



                window.scrollTo({
                    top: 500,
                    behavior: 'smooth',
                });


            }
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    };

    const handleReset = async () => {
        resetFields();
        setisTabChanged(false);

        try {
            const response = await retrieveAllData();

            if (response && response.data && Array.isArray(response.data)) {
                setDataList(response.data);
            }
        } catch (error) {
            console.error('Error fetching all data:', error);
        }
    };

    return (


        <div className="form-row d-flex align-items-center mt-4">
            <div className="col-md-6">
                <button
                    type="button"
                    className="btn btn-primary btn-lg w-100 me-3"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>

            <div className="col-md-6">
                <button
                    type="button"
                    className="btn btn-secondary btn-lg w-100 ms-3"
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>


        </div>

)
    ;
}

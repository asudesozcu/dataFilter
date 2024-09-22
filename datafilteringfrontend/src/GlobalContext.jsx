import  { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const GlobalContext = createContext();

export function GlobalProvider ({ children })  {
    const [selectedSecType, setSelectedSecType] = useState({});
    const [selectedFundType, setSelectedFundType]=useState();

    const [selectedDate, setSelectedDate] = useState(null);
    const [dates, setDates] = useState(null);

    const startDate = dates && dates.length > 0 ? dates[0] : null;
    const endDate = dates && dates.length > 1 ? dates[1] : null;

    const [donemBasıBakıyeMin, setDonemBasıBakıyeMin] = useState();
    const [donemBasıBakıyeMax, setDonemBasıBakıyeMax] = useState();
    const [donemSonBakıyeMin, setDonemSonBakıyeMin] = useState();
    const [donemSonBakıyeMax, setDonemSonBakıyeMax] = useState();

    const [currentPage, setCurrentPage] = useState(0);

const [isTabChanged,setisTabChanged]=useState(false);
    const [dataList, setDataList] = useState([]);
    return (
        <GlobalContext.Provider
            value={{
                selectedSecType,
                setSelectedSecType,
                selectedFundType,
                setSelectedFundType,
                selectedDate,
                setSelectedDate,
                dates,
                setDates,
                startDate,

                endDate,
                donemBasıBakıyeMin,
                setDonemBasıBakıyeMin,
                donemBasıBakıyeMax,
                setDonemBasıBakıyeMax,
                donemSonBakıyeMin,
                setDonemSonBakıyeMin,
                donemSonBakıyeMax,
                setDonemSonBakıyeMax,
                dataList,
                setDataList,
                currentPage,
                setCurrentPage,
                isTabChanged,
                setisTabChanged,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}

GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

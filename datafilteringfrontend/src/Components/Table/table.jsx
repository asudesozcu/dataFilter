import * as React from "react";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {retrieveAllData} from "../../api/ApiService.jsx";
import {useGlobalContext} from "../../GlobalContext.jsx";
import {format} from "date-fns";
import {Paginator} from 'primereact/paginator';
import {FaSort, FaSortUp, FaSortDown} from 'react-icons/fa';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import {Ripple} from 'primereact/ripple';
import {classNames} from 'primereact/utils';
import * as XLSX from "xlsx";


export default function DataTablePage() {
    const {dataList, setDataList} = useGlobalContext();
    const {currentPage, setCurrentPage} = useGlobalContext();

    const [sortedDataList, setSortedDataList] = useState([]);
    const [rows, setRows] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);

    const [sortConfig, setSortConfig] = useState({key: null, direction: 'asc'});

    const [pageInputTooltip, setPageInputTooltip] = useState("Press 'Enter' key to go to this page.");
    const [inputPageValue, setInputPageValue] = useState(1);

    const {isTabChanged} = useGlobalContext();


    useEffect(() => {
        if (isTabChanged === false) {

            retrieveAllData()
                .then(response => {
                    if (response && response.data && Array.isArray(response.data)) {
                        setDataList(response.data);

                        setTotalRecords(response.data.length);


                    } else {
                        console.error('Unexpected data format:', response);
                        setDataList([]);
                        setTotalRecords(0);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setDataList([]);
                    setTotalRecords(0);
                });
        }

    }, [setDataList]);

    useEffect(() => {
        setInputPageValue(currentPage + 1);
    }, [currentPage]);

    useEffect(() => {
        let sortedData = Array.isArray(dataList) ? [...dataList] : [];

        if (sortConfig.key) {
            sortedData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        setSortedDataList(sortedData);
        setTotalRecords(sortedData.length);

    }, [dataList, sortConfig]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({key, direction});
        setCurrentPage(0); // Reset to first page when sorting
    };

    const startIndex = currentPage * rows;
    const endIndex = startIndex + rows;
    const paginatedDataList = sortedDataList.slice(startIndex, endIndex);

    const COLUMNS = [
        {
            id: "secType",
            displayName: "Sec Type",
            renderCell: (item) => item.secType,
            onClick: () => handleSort("secType"),
        },
        {
            id: "fundType",
            displayName: "Fund Type",
            renderCell: (item) => item.fundType,
            onClick: () => handleSort("fundType"),
        },
        {
            id: "calenderYearMonth",
            displayName: "Calendar",
            renderCell: (item) => {
                const date = new Date(item.calenderYearMonth);
                return format(date, 'yyyy/MM');
            },
            onClick: () => handleSort("calenderYearMonth"),
        },
        {
            id: "calenderYearMonthText",
            displayName: "Calendar Text",
            renderCell: (item) => item.calenderYearMonthText,
            onClick: () => handleSort("calenderYearMonthText"),
        },
        {
            id: "donemBasiIsinBakiye",
            displayName: "Dönem Bası Bakıye",
            renderCell: (item) => item.donemBasiIsinBakiye,
            onClick: () => handleSort("donemBasiIsinBakiye"),
        },
        {
            id: "donemSonuIsinBakiye",
            displayName: "Donem Sonu Bakıye",
            renderCell: (item) => item.donemSonuIsinBakiye,
            onClick: () => handleSort("donemSonuIsinBakiye"),
        },
    ];

    const getData = (data) => {
        return data.map(item => ({
            secType: item.secType,
            fundType: item.fundType,
            calenderYearMonth: format(new Date(item.calenderYearMonth), 'yyyy/MM'),
            calenderYearMonthText: item.calenderYearMonthText,
            donemBasiIsinBakiye: item.donemBasiIsinBakiye,
            donemSonuIsinBakiye: item.donemSonuIsinBakiye,
        }));
    };

    const downloadExcel = (data, filename) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = {Sheets: {data: ws}, SheetNames: ["data"]};
        XLSX.writeFile(wb, `${filename}.xlsx`);
    };


    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? <FaSortUp/> : <FaSortDown/>;
        }
        return <FaSort/>;
    };

    // Handle page change
    const onPageChange = (event) => {
        setCurrentPage(event.page);
        setRows(event.rows);
        setInputPageValue(event.page + 1);


    };


    const onPageInputChange = (event) => {
        setInputPageValue(event.target.value);
    };

    const onPageInputKeyDown = (event, options) => {
        if (
            (event.key < '0' || event.key > '9') &&  // Block any non-digit keys
            event.key !== 'Backspace' &&
            event.key !== 'Delete' &&
            event.key !== 'ArrowLeft' &&
            event.key !== 'ArrowRight' &&
            event.key !== 'Tab' &&
            event.key !== 'Enter'
        ) {
            event.preventDefault();
        }

        if (event.key === 'Enter') {

            const page = inputPageValue;

            if (page < 1 || page > options.totalPages) {
                setPageInputTooltip(`Value must be between 1 and ${options.totalPages}`);
            } else {
                setCurrentPage(page - 1);
                setPageInputTooltip("Press 'Enter' key to go to this page.");
            }
        }
    };

    const paginationTemplate = {

        layout: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport',
        PrevPageLink: (options) => (
            <button type="button" className={classNames(options.className, 'border-round')} onClick={options.onClick}
                    disabled={options.disabled}>
                <span className="p-3">Previous</span>
                <Ripple/>
            </button>
        ),
        NextPageLink: (options) => (
            <button type="button" className={classNames(options.className, 'border-round')} onClick={options.onClick}
                    disabled={options.disabled}>
                <span className="p-3">Next</span>
                <Ripple/>
            </button>
        ),
        PageLinks: (options) => {
            if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                return <span className={classNames(options.className, 'p-disabled')}
                             style={{userSelect: 'none'}}>...</span>;
            }
            return (
                <button type="button" className={options.className} onClick={options.onClick}>
                    {options.page + 1}
                    <Ripple/>
                </button>
            );
        },
        RowsPerPageDropdown: (options) => {
            const dropdownOptions = [
                {label: 10, value: 10},
                {label: 20, value: 20},
                {label: 30, value: 30},
            ];
            return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange}/>;
        },
        CurrentPageReport: (options) => (
            <span className="mx-3" style={{color: 'var(--text-color)', userSelect: 'none'}}>
                Go to{' '}
                <InputText
                    size="2"
                    className="ml-1"
                    value={inputPageValue}
                    tooltip={pageInputTooltip}
                    onKeyDown={(e) => onPageInputKeyDown(e, options)}
                    onChange={onPageInputChange}

                />{' '}
                of {options.totalPages}
            </span>
        )
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-end my-3">
                <button
                    onClick={() => downloadExcel(getData(sortedDataList), "fon_turlerı_bazında_nakıt_akısı")}
                    className="btn btn-primary"
                >
                    Download Excel
                </button>

            </div>
            <div className="table-wrapper">
                {paginatedDataList.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            {COLUMNS.map((column, index) => (
                                <th
                                    key={index}
                                    onClick={column.onClick}
                                    style={{cursor: 'pointer'}}
                                >
                                    {column.displayName} {getSortIcon(column.id)}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedDataList.map((item, index) => (
                            <tr key={index}>
                                {COLUMNS.map((column, colIndex) => (
                                    <td key={colIndex}>{column.renderCell(item)}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">
                        <p>No data available</p>
                    </div>
                )}

                {paginatedDataList.length > 0 && (
                    <div className="card">
                        <Paginator
                            template={paginationTemplate}
                            first={currentPage * rows}
                            rows={rows}
                            totalRecords={totalRecords}
                            onPageChange={onPageChange}
                            rowsPerPageOptions={[10, 20, 30]}

                        />
                    </div>
                )}
            </div>
        </div>
    );
}
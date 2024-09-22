import React from 'react';
import SecType from "./Components/Form/SecType.jsx";
import FundType from "./Components/Form/FundType.jsx";
import CalendarText from "./Components/Form/CalendarText.jsx";
import DonemBasBakıye from "./Components/Form/DonemBasıBakıye.jsx";
import DonemSonBakıye from "./Components/Form/DonemSonuBakıye.jsx";
import CalendarYear from "./Components/Form/CalendarYear.jsx";
import SubmitButton from "./Components/Form/SubmitButton.jsx";
import DataTablePage from "./Components/Table/table.jsx";
import { GlobalProvider } from './GlobalContext';
import ApexChart from "./Components/Table/ApexChart.jsx";
import { Panel } from 'primereact/panel';


import { Tabs, Tab } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import BarChartIcon from '@mui/icons-material/BarChart';

function App() {
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <GlobalProvider>
                <div >

                    <Tabs value={tabIndex} onChange={handleTabChange} centered>
                        <Tab icon={<FilterListIcon />} label="Data Filtering" />
                        <Tab icon={<BarChartIcon />} label="Bakiye Chart" />
                    </Tabs>

                    {tabIndex === 0 && (
                        <div style={{ padding: '16px' }}>
                            <Panel header="Data Filtering" toggleable className="mb-2">
                                <div className="container">
                                    <form>
                                        <div className="row mb-2">
                                            <div className="form-group col-md-6">
                                                <SecType />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <FundType />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div>
                                                <DonemBasBakıye />
                                            </div>
                                            <div>
                                                <DonemSonBakıye />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="form-group col-md-6">
                                                <CalendarYear />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <CalendarText />
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <SubmitButton />
                                        </div>
                                    </form>
                                </div>
                            </Panel>

                            <DataTablePage />
                        </div>
                    )}

                    {tabIndex === 1 && (
                        <div style={{ padding: '16px' }}>

                            <Panel header="Bakiye Chart" toggleable className="mb-3">
                                <ApexChart />
                            </Panel>
                        </div>
                    )}
                </div>
        </GlobalProvider>
    );
}

export default App;

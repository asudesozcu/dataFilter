import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { format } from 'date-fns';
import { useGlobalContext } from "../../GlobalContext.jsx";


const getUniqueMonthsData = (data, key) => {
    const dateMap = {};

    data.forEach(item => {
        const date = new Date(item.calenderYearMonth);
        const formattedDate = format(date, 'yyyy-MM');
        const y = item[key];

        if (!dateMap[formattedDate]) {
            dateMap[formattedDate] = [];
        }
        dateMap[formattedDate].push(y);
    });

    const uniqueData = Object.keys(dateMap).map(date => {
        const sum = dateMap[date].reduce((total, val) => total + val, 0);
        const avg = sum / dateMap[date].length;
        return { x: date, y: avg };
    });

    uniqueData.sort((a, b) => new Date(a.x) - new Date(b.x));

    return uniqueData;
};

const ApexChart = () => {
    const { dataList } = useGlobalContext();
    const { setisTabChanged } = useGlobalContext();
    const { selectedSecType } = useGlobalContext();

    setisTabChanged(true);

    const [series, setSeries] = useState([
        {
            name: 'Donem Başı Bakıye',
            data: []
        }, {
            name: 'Donem Sonu Bakıye',
            data: []
        }
    ]);

    const [options, setOptions] = useState({
        chart: {
            type: 'line',
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0,
            show: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return new Intl.NumberFormat('tr-TR').format(val);
                }
            },
            forceNiceScale: true,
        },
        xaxis: {
            type: 'category',
            categories: [],
            labels: {
                rotate: -45,
                style: {
                    fontSize: '12px'
                }
            }
        },
        tooltip: {
            shared: true,
            custom: function({ series, dataPointIndex }) {


                const donemBasiValue = series[0][dataPointIndex];
                const donemSonuValue = series[1][dataPointIndex];

                const donemBasiText = isFinite(donemBasiValue) ? `Donem Başı Bakiye: ${new Intl.NumberFormat('tr-TR').format(donemBasiValue)}` : '';
                const donemSonuText = isFinite(donemSonuValue) ? `Donem Sonu Bakiye: ${new Intl.NumberFormat('tr-TR').format(donemSonuValue)}` : '';
                const overallGetiri = (isFinite(donemBasiValue) && isFinite(donemSonuValue))
                    ? `Getiri: ${(((donemSonuValue - donemBasiValue) / donemSonuValue) * 100).toFixed(2)}%`
                    : '';

                let tooltipContent = '';

                if (donemBasiText) tooltipContent += `<span>${donemBasiText}</span><br/>`;
                if (donemSonuText) tooltipContent += `<span>${donemSonuText}</span><br/>`;
                if (overallGetiri) tooltipContent += `<span><b>${overallGetiri}</b></span><br/>`;



                tooltipContent += '</div>';

                return tooltipContent.trim() !== '' ? `<div style="padding: 8px;">${tooltipContent}</div>` : '';
            }
        }


    });

    useEffect(() => {
        if (dataList && dataList.length > 0) {
            // Donem Başı ve Donem Sonu verilerini al
            const donemSonuData = getUniqueMonthsData(dataList, 'donemSonuIsinBakiye');
            const donemBasiData = getUniqueMonthsData(dataList, 'donemBasiIsinBakiye');

            // X ekseni kategorileri, tüm seriler için aynı olacak (aylar)
            const categories = donemSonuData.map(item => item.x);

            // Donem Başı ve Donem Sonu serilerini oluştur
            const updatedSeries = [
                {
                    name: 'Donem Başı Bakıye',
                    data: donemBasiData.map(item => item.y)
                },
                {
                    name: 'Donem Sonu Bakıye',
                    data: donemSonuData.map(item => item.y)
                }
            ];



            setSeries(updatedSeries);
            console.log("Series data:", updatedSeries);

            setOptions(prevOptions => ({
                ...prevOptions,
                xaxis: {
                    ...prevOptions.xaxis,
                    categories: categories
                },
            }));
        }
    }, [dataList, selectedSecType]);


    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="line"
                    height={350}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default ApexChart;
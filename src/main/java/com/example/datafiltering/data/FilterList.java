package com.example.datafiltering.data;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
public class FilterList {

    private List<Data> filterBycalenderYearMonthText(List<Data> dataList, String calenderYearMonthText) {
        return dataList.stream().filter(data -> calenderYearMonthText.equalsIgnoreCase(data.getCalenderYearMonthText())).collect(Collectors.toList());
    }


    private List<Data> filterBySecType(List<Data> dataList, String secType) {
        List<Data> filteredListForSecType = dataList.stream()
                .filter(data -> secType.equals(data.getsecType()))
                .collect(Collectors.toList());

        return filteredListForSecType;

    }


    List<Data> filterByFundType(List<Data> dataList, String fundType) {
        List<Data> filteredListForFundType = dataList.stream()
                .filter(data -> fundType.equals(data.getFundType()))
                .collect(Collectors.toList());

        return filteredListForFundType;
    }

    List<Data> filterByDonembasıBakiye(List<Data> dataList, Long givenbakiyeMin, Long givenbakiyeMax) {
        if (givenbakiyeMax == null && givenbakiyeMin != null) {
            return dataList.stream().filter(data -> data.getDonemBasiIsinBakiye() >= givenbakiyeMin)
                    .collect(Collectors.toList());
        } else if (givenbakiyeMin == null && givenbakiyeMax != null) {
            return dataList.stream().filter(data -> data.getDonemBasiIsinBakiye() <= givenbakiyeMax)
                    .collect(Collectors.toList());
        } else {
            return dataList.stream()
                    .filter(data -> (givenbakiyeMin == null || data.getDonemBasiIsinBakiye() >= givenbakiyeMin)
                            && (givenbakiyeMax == null || data.getDonemBasiIsinBakiye() <= givenbakiyeMax))
                    .collect(Collectors.toList());
        }
    }

    List<Data> filterByDonemsonuBakiye(List<Data> dataList, Long givenbakiyeMin, Long givenbakiyeMax) {
        if (givenbakiyeMax == null && givenbakiyeMin != null) {
            return dataList.stream().filter(data -> data.getDonemSonuIsinBakiye() >= givenbakiyeMin)
                    .collect(Collectors.toList());
        } else if (givenbakiyeMin == null && givenbakiyeMax != null) {
            return dataList.stream().filter(data -> data.getDonemSonuIsinBakiye() <= givenbakiyeMax)
                    .collect(Collectors.toList());
        } else {
            return dataList.stream()
                    .filter(data -> (givenbakiyeMin == null || data.getDonemBasiIsinBakiye() >= givenbakiyeMin)
                            && (givenbakiyeMax == null || data.getDonemSonuIsinBakiye() <= givenbakiyeMax))
                    .collect(Collectors.toList());
        }
    }

    List<Data> filterByCalendar(List<Data> dataList, Date givenDatemin, Date givenDatemax) {
        if (givenDatemax == null && givenDatemin != null) {
            return dataList.stream().filter(data -> data.getCalenderYearMonth().compareTo(givenDatemin) >= 0)
                    .collect(Collectors.toList());
        } else if (givenDatemin == null && givenDatemax != null) {
            return dataList.stream().filter(data -> data.getCalenderYearMonth().compareTo(givenDatemax) <= 0)
                    .collect(Collectors.toList());
        } else {
            return dataList.stream().filter(data -> data.getCalenderYearMonth().compareTo(givenDatemin) >= 0
                    && data.getCalenderYearMonth().compareTo(givenDatemax) <= 0).collect(Collectors.toList());
        }
    }

    List<Data> filterDataList(List<Data> dataList,
                              List<String> secType, List<String> fundType,
                              String calendarYearMonthText, Long donembasıbakıyeMin, Long donembasıbakıyeMax, Long donemsonubakıyeMin,
                              Long donemsonubakıyeMax, Date calendarMin, Date calendarMax) {

        List<Data> filteredData = new ArrayList<>(dataList);

        if (secType != null && !secType.isEmpty()) {
            List<Data> combinedResults = new ArrayList<>();

            for (String type : secType) {
                List<Data> filteredListForSecType = filterBySecType(filteredData, type);
                combinedResults.addAll(filteredListForSecType);
            }

            filteredData = combinedResults;
        }

        if (fundType != null && !fundType.isEmpty()) {
            List<Data> combinedResults = new ArrayList<>();

            for (String type : fundType) {
                List<Data> filteredListForFundType = filterByFundType(filteredData, type);
                combinedResults.addAll(filteredListForFundType);
            }

            filteredData = combinedResults;
        }

        if (calendarYearMonthText != null && !calendarYearMonthText.isEmpty()) {
            filteredData = filterBycalenderYearMonthText(filteredData, calendarYearMonthText);
        }
        if (donembasıbakıyeMin != null || donembasıbakıyeMax != null) {
            filteredData = filterByDonembasıBakiye(filteredData, donembasıbakıyeMin, donembasıbakıyeMax);
        }
        if (donemsonubakıyeMin != null || donemsonubakıyeMax != null) {
            filteredData = filterByDonemsonuBakiye(filteredData, donemsonubakıyeMin, donemsonubakıyeMax);
        }
        if (calendarMin != null || calendarMax != null) {
            filteredData = filterByCalendar(filteredData, calendarMin, calendarMax);
        }

        return filteredData;
    }



}

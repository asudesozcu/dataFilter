package com.example.datafiltering.data;

import java.util.*;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import com.example.datafiltering.jpa.DataRepo;

import jakarta.servlet.http.HttpSession;

@RestController
public class DataController {



    @Autowired
    private DataRepo repository;


    private FilterList filterList = new FilterList();



    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/api/secTypeOptions")
    public ResponseEntity<Set<String>> getSecTypeOptions() {

        List<Data> dataList = repository.findAll();
        if (dataList != null && !dataList.isEmpty()) {
            Set<String> secTypeSet = dataList.stream()
                    .map(Data::getsecType).sorted()
                    .collect(Collectors.toSet());
            List<String> sortedSecTypeList = new ArrayList<>(secTypeSet);
            sortedSecTypeList.sort(String::compareToIgnoreCase);
            Set<String> sortedSecTypeSet = new LinkedHashSet<>(sortedSecTypeList);

            return ResponseEntity.ok(sortedSecTypeSet);


        }
        return null;
    }

    @GetMapping("/api/fundTypeOptions")
    public ResponseEntity<Set<String>> getFundTypeOptions() {

        List<Data> dataList = repository.findAll();
        if (dataList != null && !dataList.isEmpty()) {
            Set<String> fundTypeSet = dataList.stream()
                    .map(Data::getFundType).sorted()
                    .collect(Collectors.toSet());
            List<String> sortedFundTypeList = new ArrayList<>(fundTypeSet);
            sortedFundTypeList.sort(String::compareToIgnoreCase);
            Set<String> sortedFundTypeSet = new LinkedHashSet<>(sortedFundTypeList);

            return ResponseEntity.ok(sortedFundTypeSet);


        }
        return null;
    }


    @GetMapping("/api/allData")
    public ResponseEntity<List<Data>> getAllData() {

        List<Data> dataList = repository.findAll();

        return ResponseEntity.ok(dataList);


    }


    @RequestMapping(value = "/entries/all", method = RequestMethod.GET)
    public Page<Data> showData(@RequestParam(value = "page", defaultValue = "0") Integer pageNumber,
                               @RequestParam(value = "size", defaultValue = "10") Integer pageSize,
                               @RequestParam(defaultValue = "id") String sortBy, @RequestParam(value = "sort", defaultValue = "id") String sortProperty, @RequestParam(defaultValue = "asc") String sortDirection,
                               @RequestParam(required = false) String sortColumn,
                               @RequestParam(required = false, defaultValue = "asc") String sortOrder, HttpSession session,
                               ModelMap model) {


        List<Data> dataList = repository.findAll();

        ResponseEntity<Set<String>> response = getSecTypeOptions();
        Set<String> secTypeSet = response.getBody();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortProperty));
        int start = Math.min((int) pageable.getOffset(), dataList.size());
        int end = Math.min(start + pageable.getPageSize(), dataList.size());

        List<Data> pageContent = dataList.subList(start, end);
        Page<Data> dataPage = new PageImpl<>(pageContent, pageable, dataList.size());

        return dataPage;

    }

    @PostMapping("/filterData")
    public ResponseEntity<List<Data>> filterData(@RequestParam(value = "secType", required = false) List<String> secType,
                                                 @RequestParam(value = "fundType", required = false) List<String> fundType,
                                                 @RequestParam(value = "calendarYearMonthText", required = false) String calendarYearMonthText,
                                                 @RequestParam(value = "donembasıbakıyeMin", required = false) Long donembasıbakıyeMin,
                                                 @RequestParam(value = "donembasıbakıyeMax", required = false) Long donembasıbakıyeMax,
                                                 @RequestParam(value = "donemsonubakıyeMin", required = false) Long donemsonubakıyeMin,
                                                 @RequestParam(value = "donemsonubakıyeMax", required = false) Long donemsonubakıyeMax,
                                                 @RequestParam(value = "calendarMin", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date calendarMin,
                                                 @RequestParam(value = "calendarMax", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date calendarMax,
                                                 HttpSession session) {
        List<Data> allData = repository.findAll();
        List<Data> filteredData = filterList.filterDataList(allData, secType, fundType, calendarYearMonthText, donembasıbakıyeMin,
                donembasıbakıyeMax, donemsonubakıyeMin, donemsonubakıyeMax, calendarMin, calendarMax);

        return ResponseEntity.ok(filteredData);
    }


}
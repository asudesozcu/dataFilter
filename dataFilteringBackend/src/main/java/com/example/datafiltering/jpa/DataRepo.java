package com.example.datafiltering.jpa;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.datafiltering.data.Data;

@Repository
public interface DataRepo extends JpaRepository<Data, Long> {



}

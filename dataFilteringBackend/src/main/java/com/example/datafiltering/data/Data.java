package com.example.datafiltering.data;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "FON_TURLERI_BAZINDA_NAKIT_AKISI")
public class Data {

	private Date calenderYearMonth;
	private String calenderYearMonthText;
	private Long donemBasiIsinBakiye;

	private Long donemSonuIsinBakiye;
	private String fundType;
	private String secType;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	public Data() {
	}

	public Data(String secType, String fundType, Date calenderYearMonth, String calenderYearMonthText,
			Long donemBasiIsinBakiye, Long donemSonuIsinBakiye) {
		this.secType = secType;
		this.fundType = fundType;
		this.calenderYearMonth = calenderYearMonth;
		this.calenderYearMonthText = calenderYearMonthText;
		this.donemBasiIsinBakiye = donemBasiIsinBakiye;
		this.donemSonuIsinBakiye = donemSonuIsinBakiye;
	}

	// Getters and setters
	public Long getId() {
		return id;
	}

	public Date getCalenderYearMonth() {
		return calenderYearMonth;
	}

	public void setCalenderYearMonth(Date calenderYearMonth) {
		this.calenderYearMonth = calenderYearMonth;
	}

	public String getCalenderYearMonthText() {
		return calenderYearMonthText;
	}

	public void setCalenderYearMonthText(String calenderYearMonthText) {
		this.calenderYearMonthText = calenderYearMonthText;
	}

	public Long getDonemBasiIsinBakiye() {
		return donemBasiIsinBakiye;
	}

	public void setDonemBasiIsinBakiye(Long donemBasiIsinBakiye) {
		this.donemBasiIsinBakiye = donemBasiIsinBakiye;
	}

	public Long getDonemSonuIsinBakiye() {
		return donemSonuIsinBakiye;
	}

	public void setDonemSonuIsinBakiye(Long donemSonuIsinBakiye) {
		this.donemSonuIsinBakiye = donemSonuIsinBakiye;
	}

	public String getsecType() {
		return secType;
	}

	public void setsecType(String secType) {
		this.secType = secType;
	}

	public String getFundType() {
		return fundType;
	}

	public void setFundType(String fundType) {
		this.fundType = fundType;
	}

	@Override
	public String toString() {
		return "Data [id=" + id + ", secType=" + secType + ", fundType=" + fundType + ", calenderYearMonth="
				+ calenderYearMonth + ", calenderYearMonthText=" + calenderYearMonthText + ", donemBasiIsinBakiye="
				+ donemBasiIsinBakiye + ", donemSonuIsinBakiye=" + donemSonuIsinBakiye + "]";
	}

}
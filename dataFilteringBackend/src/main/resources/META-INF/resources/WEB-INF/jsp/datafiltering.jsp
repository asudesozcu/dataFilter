<%@page import="com.example.datafiltering.data.DataController"%>
<%@page import="com.example.datafiltering.data.Data"%>
<%@page import="org.springframework.data.domain.Page"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Set"%>
<%@page import="java.util.Collections"%>
<%@ page import="com.example.datafiltering.data.FilterList" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
<!-- Bootstrap Datepicker CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
<!-- Daterangepicker CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css">
<!-- Bootstrap Icons -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</head>


<body>
    <div class="container mt-5">
        <h2 class="mb-4">Data Filtering Form</h2>
        <form id="filterForm" action="/filterData" method="post">
            <div class="row mb-3">
                <div class="form-group col-md-4">
                    <label for="secType">SEC TYPE</label>
                    <%
                    Page<Data> dataPage = (Page<Data>) request.getAttribute("dataPage");
                    List<Data> dataList = (dataPage != null) ? dataPage.getContent() : Collections.emptyList();
                    Set<String> secTypeSet = (Set<String>) request.getAttribute("secTypeSet");
                    Set<String> fundTypeSet = (Set<String>) request.getAttribute("fundTypeSet");
                
                    
                    %>
                    <select id="secType" name="secType" class="form-control">
                        <option value="">Select Sec Type</option>
                        <%
                        if (secTypeSet != null && !secTypeSet.isEmpty()) {
                            for (String secType : secTypeSet) {
                        %>
                        <option value="<%=secType%>"><%=secType%></option>
                        <%
                            }
                        }
                        %>
                    </select>
                </div>

                <div class="form-group col-md-4">
                    <label for="fundType">FUND TYPE</label>
                    <select id="fundType" name="fundType" class="form-control">
                        <option value="">Select Fund Type</option>
                        <%
                        if (fundTypeSet != null && !fundTypeSet.isEmpty()) {
                            for (String fundType : fundTypeSet) {
                        %>
                        <option value="<%=fundType%>"><%=fundType%></option>
                        <%
                            }
                        }
                        %>
                    </select>
                </div>

                <div class="form-group col-md-4">
                    <label for="calendarYearMonthText">Calendar Year Month Text</label>
                    <div class="input-group">
                        <input type="text" name="calendarYearMonthText" class="form-control datepicker" readonly />
                        <div class="input-group-append">
                            <button type="button" class="btn btn-outline-secondary" id="clearCalendarYearMonthText">Clear</button>
                        </div>
                    </div>
                    <%
                    String calendarYearMonthText = request.getParameter("calendarYearMonthText");
                    String inputFormat = "MM/yyyy";
                    String outputFormat = "yyyy-MM";
                    String formattedDate = "";

                    if (calendarYearMonthText != null && !calendarYearMonthText.isEmpty()) {
                        formattedDate = FilterList.formatDate(calendarYearMonthText, inputFormat, outputFormat);
                    } else {
                        formattedDate = "No date selected";
                    }
                    %>
                </div>
            </div>

			
<div class="form-row">
				<div class="form-group col-md-6">
					<label for="donembasıbakıyeMin">DONEM BASI BAKIYE (Min)</label> 
					<input type="number" id="donembasıbakıyeMin" name="donembasıbakıyeMin" class="form-control" placeholder="Min value" />

				</div>
				<div class="form-group col-md-6">
					<label for="donembasıbakıyeMax">DONEM BASI BAKIYE (Max)</label> 
					<input type="number" id="donembasıbakıyeMax" name="donembasıbakıyeMax" class="form-control" placeholder="Max value" />

				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-md-6">
					<label for="donemsonubakıyeMin">DONEM SONU BAKIYE (Min)</label> <input
						type="number" id="donemsonubakıyeMin" name="donemsonubakıyeMin"
						class="form-control" placeholder="Min value" />
				</div>
				<div class="form-group col-md-6">
					<label for="donemsonubakıyeMax">DONEM SONU BAKIYE (Max)</label> <input
						type="number" id="donemsonubakıyeMax" name="donemsonubakıyeMax"
						class="form-control" placeholder="Max value" />
				</div>
			</div>

			<div class="form-group">
				<label for="dateRangePicker">Select Date Range</label>
                <div class="input-group">
                    <input type="text" name="dateRangePicker" class="form-control date-range-picker" readonly />
                    <div class="input-group-append">
                        <button type="button" class="btn btn-outline-secondary" id="clearDateRangePicker">Clear</button>
                    </div>
                </div>
			</div>

			<input type="hidden" name="startDate" /> 
			<input type="hidden" name="endDate" />

			<div class="form-row">
				<div class="col-md-6">
					<button type="submit" name="Submit" class="btn btn-primary w-100">Submit</button>
				</div>
				<div class="col-md-6">
					<button type="submit" name="showallbutton"
						class="btn btn-secondary w-100">Show All</button>
				</div>
			</div>
		</form>

		<br>

		<div class="table-wrapper">
			<table  class="table table-striped table-bordered">
			<thead class="thead-dark">
				<tr>
					<th>Sec Type
						<form method="get" action="">
							<input type="hidden" name="page" value="${currentPage}">
							<input type="hidden" name="sortColumn" value="secType"> <input
								type="hidden" name="sortOrder"
								value="${sortColumn == 'secType' && sortOrder == 'asc' ? 'desc' : 'asc'}">
							<button type="submit" class="btn btn-sm btn-link p-0">
								<i
									class="bi ${sortColumn == 'secType' && sortOrder == 'asc' ? 'bi-arrow-down' : 'bi-arrow-up'}"></i>
							</button>
						</form>
					</th>
					<th>Fund Type
						<form method="get" action="">
							<input type="hidden" name="page" value="${currentPage}">
							<input type="hidden" name="sortColumn" value="fundType">
							<input type="hidden" name="sortOrder"
								value="${sortColumn == 'fundType' && sortOrder == 'asc' ? 'desc' : 'asc'}">
							<button type="submit" class="btn btn-sm btn-link p-0">
								<i
									class="bi ${sortColumn == 'fundType' && sortOrder == 'asc' ? 'bi-arrow-down' : 'bi-arrow-up'}"></i>
							</button>
						</form>
					</th>
					<th>Calendar
						<form method="get" action="">
							<input type="hidden" name="page" value="${currentPage}">
							<input type="hidden" name="sortColumn" value="calenderYearMonth">
							<input type="hidden" name="sortOrder"
								value="${sortColumn == 'calenderYearMonth' && sortOrder == 'asc' ? 'desc' : 'asc'}">
							<button type="submit" class="btn btn-sm btn-link p-0">
								<i
									class="bi ${sortColumn == 'calenderYearMonth' && sortOrder == 'asc' ? 'bi-arrow-down' : 'bi-arrow-up'}"></i>
							</button>
						</form>
					</th>
					<th>Calendar Text
						<form method="get" action="">
							<input type="hidden" name="page" value="${currentPage}">
							<input type="hidden" name="sortColumn"
								value="calenderYearMonthText"> <input type="hidden"
								name="sortOrder"
								value="${sortColumn == 'calenderYearMonthText' && sortOrder == 'asc' ? 'desc' : 'asc'}">
							<button type="submit" class="btn btn-sm btn-link p-0">
								<i
									class="bi ${sortColumn == 'calenderYearMonthText' && sortOrder == 'asc' ? 'bi-arrow-down' : 'bi-arrow-up'}"></i>
							</button>
						</form>
					</th>
					<th>Donem Bası
						<form method="get" action="">
							<input type="hidden" name="page" value="${currentPage}">
							<input type="hidden" name="sortColumn"
								value="donemBasiIsinBakiye"> <input type="hidden"
								name="sortOrder"
								value="${sortColumn == 'donemBasiIsinBakiye' && sortOrder == 'asc' ? 'desc' : 'asc'}">
							<button type="submit" class="btn btn-sm btn-link p-0">
								<i
									class="bi ${sortColumn == 'donemBasiIsinBakiye' && sortOrder == 'asc' ? 'bi-arrow-down' : 'bi-arrow-up'}"></i>
							</button>
						</form>
					</th>
					<th>Donem Sonu
						<form method="get" action="">
							<input type="hidden" name="page" value="${currentPage}">
							<input type="hidden" name="sortColumn"
								value="donemSonuIsinBakiye"> <input type="hidden"
								name="sortOrder"
								value="${sortColumn == 'donemSonuIsinBakiye' && sortOrder == 'asc' ? 'desc' : 'asc'}">
							<button type="submit" class="btn btn-sm btn-link p-0">
								<i
									class="bi ${sortColumn == 'donemSonuIsinBakiye' && sortOrder == 'asc' ? 'bi-arrow-down' : 'bi-arrow-up'}"></i>
							</button>
						</form>
					</th>
				</tr>
			</thead>
			<tbody id="dataTable"  >
					<%
					if (dataList != null && !dataList.isEmpty()) {
						for (Data data : dataList) {
					%>
					<tr >
						<td><%=data.getsecType()%></td>
						<td><%=data.getFundType()%></td>
						<td><%=data.getCalenderYearMonth()%></td>
						<td><%=data.getCalenderYearMonthText()%></td>
						<td><%=data.getDonemBasiIsinBakiye()%></td>
						<td><%=data.getDonemSonuIsinBakiye()%></td>
					</tr>
					<%
					}
					} else {
					%>
					<tr>
						<td colspan="6" class="text-center">No data found</td>
					</tr>
					<%
					}
					%>
				</tbody>
			</table>
			<div class="pagination-wrapper">
				<nav aria-label="Page navigation example">
					<ul class="pagination">
						<%
						int currentPage = 0;
						if (request.getAttribute("currentPage") != null) {
							currentPage = (int) request.getAttribute("currentPage");
						}
						int totalPages = (dataPage != null) ? dataPage.getTotalPages() : 0;
						int buttonsToShow = 10;

						int startPage = Math.max(0, currentPage - buttonsToShow / 2);
						int endPage = Math.min(totalPages - 1, startPage + buttonsToShow - 1);

						if (endPage - startPage + 1 < buttonsToShow) {
							startPage = Math.max(0, endPage - buttonsToShow + 1);
						}
						%>
						<li class="page-item <%=(currentPage <= 0) ? "disabled" : ""%>">
							<a class="page-link"
							href="?page=0&sortColumn=${sortColumn}&sortOrder=${sortOrder}">
								<< </a>
						</li>

						<li class="page-item <%=(currentPage <= 0) ? "disabled" : ""%>">
							<a class="page-link"
							href="?page=<%= (currentPage - 1) %>&sortColumn=${sortColumn}&sortOrder=${sortOrder}">
								Previous </a>
						</li>

						<%
						for (int i = startPage; i <= endPage; i++) {
						%>
						<li class="page-item <%=(currentPage == i) ? "active" : ""%>">
							<a class="page-link"
							href="?page=<%= i %>&sortColumn=${sortColumn}&sortOrder=${sortOrder}">
								<%=i %>
						</a>
						</li>
						<%
						}
						%>
						<li
							class="page-item <%=(currentPage >= totalPages - 1) ? "disabled" : ""%>">
							<a class="page-link"
							href="?page=${currentPage + 1}&sortColumn=${sortColumn}&sortOrder=${sortOrder}">
								Next </a>
						</li>
						<li
							class="page-item <%=(currentPage >= totalPages - 1) ? "disabled" : ""%>">
							<a class="page-link"
							href="?page=<%=totalPages - 1%>&sortColumn=${sortColumn}&sortOrder=${sortOrder}">
								>> </a>
						</li>
					</ul>
				</nav>
				<form method="get" action="">
				<div class="input-group mb-3">
					<input type="number" class="form-control" name="page" min="1"
						max="<%=totalPages%>" placeholder="Enter page number"> <input
						type="hidden" name="sortColumn" value="${ sortColumn}"> <input
						type="hidden" name="sortOrder" value="${ sortOrder}">
					<div class="input-group-append">
						<button class="btn btn-outline-secondary" type="submit">Go</button>
					</div>
				</div>
			</form>
			</div>
			

		</div>




	</div>
	
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/moment/min/moment.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>

<script>


$(document).ready(function() {

	
    // Initialize date range picker
    $('input[name="dateRangePicker"]').daterangepicker(
        {
            opens: 'left',
            autoUpdateInput: false,
            locale: {
                format: 'YYYY-MM-DD'
            }
        },
        function(start, end, label) {
            $('input[name="dateRangePicker"]').val(
                start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
            $('input[name="startDate"]').val(start.format('YYYY-MM-DD'));
            $('input[name="endDate"]').val(end.format('YYYY-MM-DD'));
        }
    );

    // Initialize datepicker
    $('.datepicker').datepicker({
        format: 'mm/yyyy',
        minViewMode: 1,
        autoclose: true
    });
    
    $('#clearDateRangePicker').click(function() {
        $('input[name="dateRangePicker"]').val('');
        $('input[name="startDate"]').val('');
        $('input[name="endDate"]').val('');
    });

    // Clear calendar year month text
    $('#clearCalendarYearMonthText').click(function() {
        $('input[name="calendarYearMonthText"]').val('');
    });
    
    
    $('#filterForm').submit(function(event) {
        event.preventDefault();
        var form = $(this);
        $.ajax({
            type: 'POST',
            url: '/filterData', 
            data: form.serialize(),
            success: function(response) {
                $('#dataTable').html($(response).find('#dataTable').html());
                $('.pagination-wrapper').html($(response).find('.pagination-wrapper').html());
                $('#filterForm')[0].reset();

            },
            error: function(xhr, status, error) {
                console.error("An error occurred: " + status + " - " + error);
            }
        });
    });

    // Handle pagination link clicks
    $(document).on('click', '.pagination a', function(event) {
        event.preventDefault();
        var url = $(this).attr('href');
        $.get(url, function(response) {
            $('#dataTable').html($(response).find('#dataTable').html());
            $('.pagination-wrapper').html($(response).find('.pagination-wrapper').html());
        });
    });

});

</script>

</body>
</html>
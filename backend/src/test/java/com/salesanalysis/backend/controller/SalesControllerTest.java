package com.salesanalysis.backend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.util.Date;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.salesanalysis.backend.model.Product;
import com.salesanalysis.backend.model.Sales;
import com.salesanalysis.backend.service.SalesService;

@SpringBootTest
public class SalesControllerTest {

	@Autowired
	private SalesController salesController;


	@Test
	public void testRecordSale() {

		Product product = new Product(1, "iPhone 13", "Smartphone", 999.99, null);
		Sales sales = new Sales(1, 123, new Date(), 100.0, product);

		//Mockito.doNothing().when(salesService).createSales(sales);

		String result = salesController.recordSale(sales);

		// Assertions
		assertEquals("Sale created successfully", result);
	}
	
	
	@Test
	public void testGetSalesReport() {
		
		Sales sales = salesController.report(1);
		
		assertEquals(1, sales.getSaleId());
	}
	
	

}

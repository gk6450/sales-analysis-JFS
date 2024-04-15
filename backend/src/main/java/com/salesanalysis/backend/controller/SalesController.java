package com.salesanalysis.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.salesanalysis.backend.model.Sales;
import com.salesanalysis.backend.service.SalesService;

@RestController
@RequestMapping("/sales")
@CrossOrigin(origins = "*")
public class SalesController {

	@Autowired
	private SalesService salesService;

	@GetMapping("/all-sales")
	public List<Sales> fetchAllSales() {
		return salesService.getAllSales();
	}

	@GetMapping("/all-sales/{saleId}")
	public Sales getSalesReport(@PathVariable Integer saleId) {
		Sales sales = salesService.getSalesById(saleId);
		return new Sales(
				sales.getSaleId(),
				sales.getQuantity(),
				sales.getSaleDate(),
				sales.getRevenue(),
				sales.getProduct());
	}
	
	public Sales report(Integer saleId) {
		return salesService.getSalesById(saleId);
	}
	
	@GetMapping("/all-sales-by-product/{productId}")
	public List<Sales> getSalesByProductId(@PathVariable Integer productId){
		return salesService.getSalesByProductId(productId);
	}

	@PostMapping("/new-sale")
	public String recordSale(@RequestBody Sales sales) {
		try {
			salesService.createSales(sales);
		} catch (Exception e) {
			return e.getMessage();
		}
		return "Sale created successfully";
	}

	@PutMapping("/update-sale/{saleId}")
	public String updateSale(@PathVariable Integer saleId, @RequestBody Sales sales) {
		try {
			salesService.updateSales(saleId, sales);
		} catch (Exception e) {
			return e.getMessage();
		}
		return "Sale updated successfully";
	}
	
	@DeleteMapping("/delete-sale/{saleId}")
	public String deleteSale(@PathVariable Integer saleId) {
		try {
			salesService.deleteSalesById(saleId);
		} catch (Exception e) {
			return e.getMessage();
		}
		return "Sale deleted successfully";
	}
}

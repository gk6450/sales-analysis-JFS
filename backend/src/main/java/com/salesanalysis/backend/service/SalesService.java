package com.salesanalysis.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.salesanalysis.backend.model.Sales;
import com.salesanalysis.backend.repository.SalesRepository;

@Service
public class SalesService {

	@Autowired
	private SalesRepository salesRepository;
	

	public List<Sales> getAllSales() {
		return salesRepository.findAll();
	}

	public Sales getSalesById(Integer id) {
		return salesRepository.getById(id);
	}
	
	public List<Sales> getSalesByProductId(Integer id){
		return salesRepository.findByProductProductId(id);
	}

	public void createSales(Sales sales) {
		salesRepository.save(sales);

	}

	public void updateSales(Integer id, Sales sales ) {
		if(salesRepository.existsById(id)) {
			sales.setSaleId(id);
			salesRepository.save(sales);
		}
	}
	
	public void deleteSalesById(Integer id) {
		salesRepository.deleteById(id);
	}
}

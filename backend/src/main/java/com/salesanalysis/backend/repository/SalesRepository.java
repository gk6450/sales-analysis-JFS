package com.salesanalysis.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.salesanalysis.backend.model.Sales;

public interface SalesRepository extends JpaRepository<Sales, Integer> {
	List<Sales> findByProductProductId(Integer productId);
}

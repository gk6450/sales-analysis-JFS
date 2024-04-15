package com.salesanalysis.backend.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Sales {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer saleId;
	private Integer quantity;
	private Date saleDate;
	private Double revenue;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "productId")
	private Product product;

	public Sales() {
	}

	public Sales(Integer saleId, Integer quantity, Date saleDate, Double revenue, Product product) {
		super();
		this.saleId = saleId;
		this.quantity = quantity;
		this.saleDate = saleDate;
		this.revenue = revenue;
		this.product = product;
	}

	public Integer getSaleId() {
		return saleId;
	}

	public void setSaleId(Integer saleId) {
		this.saleId = saleId;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Date getSaleDate() {
		return saleDate;
	}

	public void setSaleDate(Date saleDate) {
		this.saleDate = saleDate;
	}

	public Double getRevenue() {
		return revenue;
	}

	public void setRevenue(Double revenue) {
		this.revenue = revenue;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SalesAnalysisService } from "../sales.analysis.service";

@Component({
  selector: "app-sales-record",
  templateUrl: "./sales-record.component.html",
  styleUrls: ["./sales-record.component.css"],
})
export class SalesRecordComponent implements OnInit {
  private productDetails: any;
  private revenue: any;
  private recordSaleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private salesAnalysisService: SalesAnalysisService
  ) {}

  ngOnInit() {
    this.recordSaleForm = this.fb.group({
      productID: ["", Validators.required],
      quantity: ["", Validators.required],
      saleDate: ["", Validators.required],
    });
  }

  onRecordSaleSubmit() {
    const saleDateValue = this.recordSaleForm.get("saleDate").value;
    const formattedSaleDate = new Date(saleDateValue).toISOString();

    const data: any = {
      quantity: this.recordSaleForm.get("quantity").value,
      saleDate: formattedSaleDate,
      revenue: parseFloat(this.revenue),
      product: {
        productId: this.productDetails.productId,
      },
    };
    this.salesAnalysisService.recordSales(data).subscribe(
      (res) => {
        // console.log(res);
        this.revenue = 0;
        this.productDetails = "";
        this.recordSaleForm.reset();
      },
      (error) => {
        if (error.status == 200) {
          alert("Sale recorded successfully");
          this.recordSaleForm.reset();
          this.revenue = 0;
          this.productDetails = "";
        }
      }
    );
  }

  checkAvailability(productId: number) {
    this.salesAnalysisService.getProduct(productId).subscribe(
      (data: any) => {
        if (data) {
          this.productDetails = data;
        } else {
        this.recordSaleForm.reset();
        this.productDetails="";
        this.recordSaleForm.patchValue({
          productID: "",
        });
        alert("Product is not available with the given ID.");
        }
      },
      (error) => {
        this.recordSaleForm.reset();
        this.productDetails="";
        this.recordSaleForm.patchValue({
          productID: "",
        });
        alert("Product is not available with the given ID.");
      }
    );
  }

  calculatePrice(quantity: number) {
    this.revenue = quantity * this.productDetails.price;
    this.revenue = this.revenue.toFixed(2);
  }

  

}

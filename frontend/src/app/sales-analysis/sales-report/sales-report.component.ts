import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { SalesAnalysisService } from "../sales.analysis.service";

@Component({
  selector: "app-sales-report",
  templateUrl: "./sales-report.component.html",
  styleUrls: ["./sales-report.component.css"],
})
export class SalesReportComponent implements OnInit {
  private selectedIdType: string;
  private saleID: number;
  private productID: number;
  private showProgressBar: boolean = false;
  private progressWidth: number = 0;
  private progressInterval: any;
  private reportsBySaleId: any;
  private reportsByProductId: any[];

  constructor(private salesAnalysisService: SalesAnalysisService) {}

  ngOnInit() {}

  clearOptions() {
    this.selectedIdType = "";
    this.productID=null;
    this.saleID=null;
  }

  getReportBySaleID() {  
    this.salesAnalysisService
      .getSalesReport(this.saleID)
      .subscribe((data: any) => {
        if(data.saleId){
          this.reportsBySaleId = data;
          this.generateReport("sale");
        }
        else{
          alert(`Sale Record with the ID ${this.saleID} is not available`);
          this.clearOptions();
        }
      },
      (error)=>{
        alert(`Sale Record with the ID ${this.saleID} is not available`);
        this.clearOptions();
      });
  }

  getReportByProductID() {
    this.salesAnalysisService
      .getSalesReportByProductId(this.productID)
      .subscribe((data: any[]) => {
        if(data.length>0){
          this.reportsByProductId = data;
          this.generateReport("product");
        }else{
          alert(`Sale Record for the given Product ID ${this.productID} is not available`);
          this.clearOptions();
        }
      },
      (error)=>{
        alert(`Sale Record for the given Product ID ${this.productID} is not available`);
        this.clearOptions();
      });
  }

  generatePdfForSale(data: any) {
    const doc = new jsPDF();

    doc.text("Sales Report for the Sale ID " + data.saleId, 65, 10);

    const tableData = [];

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "object" && value !== null) {
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          tableData.push([nestedKey, nestedValue]);
        }
      } else {
        tableData.push([key, value]);
      }
    }

    autoTable(doc, {
      body: tableData,
      startY: 20,
      columnStyles: {
        0: { fontStyle: "bold", halign: "center" },
        1: { halign: "center" },
      },
      styles: {
        halign: "center",
      },
    });
    doc.save("Sales_Report.pdf");
  }

  generatePdfForProduct(data: any[], productData: any) {
    const doc = new jsPDF();
    const headers = ["Sale ID", "Quantity", "Sale Date", "Revenue"];
    const salesData = data.map((sale) => [
      sale.saleId,
      sale.quantity,
      new Date(sale.saleDate).toLocaleDateString(),
      `$${sale.revenue.toFixed(2)}`,
    ]);

    doc.text("Sales Report for the Product " + productData.name, 60, 10);

    const tableData = [];

    for (const [key, value] of Object.entries(productData)) {
      tableData.push([key, value]);
    }

    autoTable(doc, {
      body: tableData,
      startY: 20,
      columnStyles: {
        0: { fontStyle: "bold", halign: "center" },
        1: { halign: "center" },
      },
      styles: {
        halign: "center",
      },
    });

    autoTable(doc, {
      theme: "striped",
      head: [headers],
      headStyles: { halign: "center" },
      body: salesData,
      startY: 70,
      columnStyles: {
        0: { cellWidth: 40, halign: "center" },
        1: { cellWidth: 40, halign: "center" },
        2: { cellWidth: 50, halign: "center" },
        3: { cellWidth: 50, halign: "center" },
      },
      margin: { top: 10 },
    });

    doc.save("Sales_Report.pdf");
  }

  generateReport(type: string) {
    this.showProgressBar = true;
    this.progressWidth = 0;

    this.progressInterval = setInterval(() => {
      this.progressWidth += 1;
      if (this.progressWidth >= 100) {
        clearInterval(this.progressInterval);
        this.showProgressBar = false;
        this.progressWidth = 0;
        if (type === "product") {
          this.generatePdfForProduct(
            this.reportsByProductId,
            this.reportsByProductId[0].product
          );
        }
        if (type === "sale") {
          this.generatePdfForSale(this.reportsBySaleId);
        }
        this.clearOptions();
      }
    }, 25);
  }
}

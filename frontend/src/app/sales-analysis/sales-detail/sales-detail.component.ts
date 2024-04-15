import { Component, OnInit } from '@angular/core';
import { SalesAnalysisService } from '../sales.analysis.service';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.component.html',
  styleUrls: ['./sales-detail.component.css']
})
export class SalesDetailComponent implements OnInit {

  private allSales: any[];
  private filteredSales: any[];
  private sortBy: string;
  private sortDirection: 'asc' | 'desc';
  constructor(private salesAnalysisService:SalesAnalysisService) {
    this.allSales = [];
    this.filteredSales = [];
    this.sortBy = 'saleId';
    this.sortDirection = 'asc';
   }

  ngOnInit() {
    this.salesAnalysisService.getSalesDetails().subscribe(
      (data:any[])=>{
        this.allSales=data;
        this.applySorting();
      }
    );
  }

  applySorting() {
    if (this.allSales && this.allSales.length > 0) {
      this.filteredSales = this.allSales.slice(0);

      this.filteredSales.sort((a, b) => {
        const valueA = this.getPropertyValue(a, this.sortBy);
        const valueB = this.getPropertyValue(b, this.sortBy);

        if (valueA < valueB) {
          return this.sortDirection === 'asc' ? -1 : 1;
        } else if (valueA > valueB) {
          return this.sortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
  }

  getPropertyValue(obj: any, path: string): any {
    return path.split('.').reduce((o, key) => (o && o[key] !== undefined ? o[key] : undefined), obj);
  }

  onSort(column: string) {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
    this.applySorting();
  }

  onSearchChange(searchValue: string) {
    if (searchValue) {
      this.filteredSales = this.allSales.filter(sale =>
        sale.product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      this.filteredSales = [...this.allSales];
    }
  }

  onRowClick(sale:any){
    this.generatePdfForSale(sale);
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

}

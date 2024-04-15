import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})

export class SalesAnalysisService{

    private salesAnalysisAPI = "http://localhost:9999/sales";
    private productAPI = "http://localhost:9999/product";

    constructor(private http: HttpClient) {}

    

    getSalesDetails():Observable<any[]>{
        const url = `${this.salesAnalysisAPI}/all-sales`
        return this.http.get<any[]>(url);
    }

    recordSales(data:any):Observable<any>{
        const url = `${this.salesAnalysisAPI}/new-sale`
        return this.http.post<any>(url,data);
    }

    getProduct(productId:number):Observable<any>{
        const url=`${this.productAPI}/all-products/${productId}`;
        return this.http.get<any>(url);
    }

    getSalesReport(saleId:number):Observable<any>{
        const url = `${this.salesAnalysisAPI}/all-sales/${saleId}`
        return this.http.get<any>(url);
    }

    getSalesReportByProductId(productId:number):Observable<any[]>{
        const url = `${this.salesAnalysisAPI}/all-sales-by-product/${productId}`
        return this.http.get<any[]>(url);
    }
}
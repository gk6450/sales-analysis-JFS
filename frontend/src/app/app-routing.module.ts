import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SalesAnalysisComponent } from "./sales-analysis/sales-analysis.component";
import { SalesDetailComponent } from "./sales-analysis/sales-detail/sales-detail.component";
import { SalesRecordComponent } from "./sales-analysis/sales-record/sales-record.component";
import { SalesReportComponent } from "./sales-analysis/sales-report/sales-report.component";

const routes: Routes = [
  {
    path: "sales-analysis",
    component: SalesAnalysisComponent,
    children: [
      { path: "", redirectTo: "sales-detail", pathMatch: "full" },
      { path: "sales-detail", component: SalesDetailComponent },
      { path: "sales-record", component: SalesRecordComponent },
      { path: "sales-report", component: SalesReportComponent },
    ],
  },
  {
    path: "",
    redirectTo: "sales-analysis",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

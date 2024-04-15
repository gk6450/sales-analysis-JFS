import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesAnalysisComponent } from './sales-analysis/sales-analysis.component';
import { SalesReportComponent } from './sales-analysis/sales-report/sales-report.component';
import { SalesRecordComponent } from './sales-analysis/sales-record/sales-record.component';
import { SalesDetailComponent } from './sales-analysis/sales-detail/sales-detail.component';
import { SalesAnalysisService } from './sales-analysis/sales.analysis.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SalesAnalysisComponent,
    SalesReportComponent,
    SalesRecordComponent,
    SalesDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SalesAnalysisService],
  bootstrap: [AppComponent]
})
export class AppModule { }

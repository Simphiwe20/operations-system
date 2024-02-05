import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import * as XLSX from 'xlsx'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  ExcelData: any;
  displayedColumns: string[] = ['email', 'name', 'surname', 'department', 'occupation'];
  dataSource: MatTableDataSource<any>;
  users: any;
  employees: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sharedService: SharedServiceService) {
    // Create 100 users

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.sharedService.getData('local','employees'));
    console.log(this.dataSource)
    console.log(sharedService.generatePwd())
    this.users = this.sharedService.getData('local', 'users')
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onFileChange(event: any): void {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    // fileReader.readAsBinaryString(file)
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e: any) => {
      let workBook = XLSX.read(fileReader.result, { type: 'binary' });
      let sheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
      console.log(this.ExcelData)
      this.sharedService.storeData('local', 'employees', this.ExcelData)
      this.dataSource = new MatTableDataSource(this.sharedService.getData('local','employees'));
      this.sharedService.storeNewUsers()

    };

    // fileReader.readAsArrayBuffer(file);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

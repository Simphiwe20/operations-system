import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveFormComponent } from 'src/app/forms/leave-form/leave-form.component'
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.scss']
})
export class VisaComponent {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'occupation', 'status'];
  dataSource!: MatTableDataSource<any>;
  user: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matDialog: MatDialog, private sharedService: SharedServiceService) {
    this.dataSource = new MatTableDataSource<any>;
    this.user = sessionStorage.getItem('user')
    this.user = this.user ? JSON.parse(this.user) : {}

  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  RequestGH(): void {
    this.matDialog.open(LeaveFormComponent)
  }
}

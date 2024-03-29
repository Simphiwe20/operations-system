import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PolicyFormComponent } from 'src/app/forms/policy-form/policy-form.component';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent {
  displayedColumns: string[] = ['name', 'category', 'action', 'download' ];
  dataSource!: MatTableDataSource<any>;
  user: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matDialog: MatDialog, private sharedService: SharedServiceService) {
    this.dataSource = this.sharedService.getData('local', 'policies');
    this.user = sessionStorage.getItem('user')
    this.user = this.user ? JSON.parse(this.user) : {}
    console.log(this.dataSource)
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
    let dialogRef = this.matDialog.open(PolicyFormComponent)
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.dataSource = this.sharedService.getData('local', 'policies')
      }
    })
  }
}

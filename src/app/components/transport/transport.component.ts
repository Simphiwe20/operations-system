import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransportFormComponent } from 'src/app/forms/transport-form/transport-form.component';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent {
  displayedColumns: string[] = ['reqID', 'transportType', 'neededDate', 'pickUpSpot', 'pickUpReason', 'dropOffSpot', 'status'];
  dataSource!: MatTableDataSource<any>;
  user: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matDialog: MatDialog, private sharedService: SharedServiceService, 
    private snackBar: MatSnackBar) {
    this.dataSource = this.sharedService.getData('local', 'transport');
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

  requestTransport(): void {
    let dialogRef = this.matDialog.open(TransportFormComponent)
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.dataSource = this.sharedService.getData('local', 'transport');
        this.snackBar.open(res, 'OK', {duration: 3000})
      }
    })
  }
}

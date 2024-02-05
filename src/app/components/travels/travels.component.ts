import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TravelsFormComponent } from 'src/app/forms/travels-form/travels-form.component';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.scss']
})
export class TravelsComponent {

  displayedColumns: string[] = ['reqID', 'travelType', 'returnDate', 'travelReason', 'departureDate', 'status'];
  dataSource!: MatTableDataSource<any>;
  user: any;
  userTravels: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matDialog: MatDialog, private sharedService: SharedServiceService,
    private snackBar: MatSnackBar) {
    this.userTravels = this.sharedService.getData('local', 'travels');
    this.user = sessionStorage.getItem('user')
    this.user = this.user ? JSON.parse(this.user) : {}
    if (this.user.role === 'employee') {
      this.dataSource = this.userTravels.filter((travel: any) => {
        if (travel.requestedByEmail === this.user.email) {
          return travel
        }
      })
    }else {
      this.dataSource = this.userTravels
    }


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

  travelReq(): void {
    let dialogRef = this.matDialog.open(TravelsFormComponent)
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.userTravels = this.sharedService.getData('local', 'travels');
        this.dataSource = this.userTravels.filter((travel: any) => {
          if (travel.requestedByEmail === this.user.email) {
            return travel
          }
        })
        this.snackBar.open(res, 'OK', { duration: 3000 })
      }
    })

  }
}

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GuesthouseFormComponent } from 'src/app/forms/guesthouse-form/guesthouse-form.component';
import { LeaveFormComponent } from 'src/app/forms/leave-form/leave-form.component'
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-guesthouse',
  templateUrl: './guesthouse.component.html',
  styleUrls: ['./guesthouse.component.scss']
})
export class GuesthouseComponent {
  displayedColumns: string[] = ['reqID', 'name', 'checkInDate', 'checkOutDate', 'status'];
  dataSource!: MatTableDataSource<any>;
  user: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matDialog: MatDialog, private sharedService: SharedServiceService,
    private snackBar: MatSnackBar) {
    this.dataSource = this.sharedService.getData('local', 'guesthouse');
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

  guesthouseRequest(): void {
    let dialogRef = this.matDialog.open(GuesthouseFormComponent)
    dialogRef.afterClosed().subscribe(res => {
      this.snackBar.open(res, 'OK', { duration: 3000 })
      this.dataSource = this.sharedService.getData('local', 'guesthouse');

    })
  }
}

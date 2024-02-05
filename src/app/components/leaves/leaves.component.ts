import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveFormComponent } from 'src/app/forms/leave-form/leave-form.component';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'occupation', 'status'];
  dataSource!: MatTableDataSource<any>;
  user: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matDialog: MatDialog, private sharedService: SharedServiceService, 
    private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<any>;
    this.user = sessionStorage.getItem('user');
    this.user = this.user ? JSON.parse(this.user) : {}
    console.log(this.sharedService.getData('local', 'leaves'))
    this.dataSource = this.sharedService.getData('local', 'leaves')
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

  applyLeave(): void {
    let dialogRef = this.matDialog.open(LeaveFormComponent)

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.snackBar.open(res, 'OK', {duration: 3000})
      }
    })
  }
}

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VisaFormComponent } from 'src/app/forms/visa-form/visa-form.component';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.scss']
})
export class VisaComponent {
  displayedColumns: string[] = ['id', 'name', 'fruit', 'status'];
  dataSource!: MatTableDataSource<any>;
  user: any;
  userVisas: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matDialog: MatDialog, private sharedService: SharedServiceService, 
    private snackBar: MatSnackBar) {
    this.userVisas = this.sharedService.getData('local', 'visas');
    this.user = sessionStorage.getItem('user')
    this.user = this.user ? JSON.parse(this.user) : {}
    if(this.user.role === 'emploee') {
      this.dataSource = this.userVisas.filter((visa: any) => {
      if(visa.requestedByEmail === this.user.email) {
        return visa
      }
    })
    }else {
      this.dataSource = this.userVisas
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

  RequestVisa(): void {
    let dialogRef = this.matDialog.open(VisaFormComponent)
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.userVisas = this.sharedService.getData('local', 'visas')
        this.dataSource = this.userVisas.filter((visa: any) => {
          if(visa.requestedByEmail === this.user.email) {
            return visa
          }
        })
        this.snackBar.open(res, 'OK', {duration: 3000})
        
      }
    })
  }
}

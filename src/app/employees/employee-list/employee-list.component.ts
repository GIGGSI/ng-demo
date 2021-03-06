import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../../shared/employee.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {DepartmentService} from "../../shared/department.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EmployeeComponent} from "../employee/employee.component";
import {NotificationService} from "../../shared/notification.service";
import {DialogService} from "../../shared/dialog.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
              private departmentService: DepartmentService,
              private dialog: MatDialog,
              private notification: NotificationService,
              private dialogService: DialogService) {
  }

  listData: MatTableDataSource<any>
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      list => {
        let array = list.map(item => {

          return {
            $key: item.key,

            ...item.payload.val()
          };
        })
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(el => {
            return el != 'actions' && data[el]
              .toLowerCase().indexOf(filter) != -1;
          })

        }
      }
    )
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%"
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onEdit(row) {
     this.employeeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%"
    this.dialog.open(EmployeeComponent, dialogConfig);
    console.log(row)

  }

  onDelete($key) {
    this.dialogService
      .openConfirmDialog('Are you sure to delte this record?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.employeeService.deleteEmployee($key);
        this.notification.warm('Deleted Successfully')
      }
    })
  }

}

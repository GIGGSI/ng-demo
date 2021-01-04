import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../shared/employee.service';
import {DepartmentService} from '../../shared/department.service';
import {NotificationService} from "../../shared/notification.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  departments = [
    {id: 1, value: 'Dep 1'},
    {id: 2, value: 'Dep 2'},
    {id: 3, value: 'Dep 3'}];


  constructor(private employeeService: EmployeeService,
              private departmentService: DepartmentService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<EmployeeComponent>) {
  }


  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.employeeService.getEmployees();
  }

  // tslint:disable-next-line:typedef
  onClear() {
    console.log(this.departmentService.array);
    this.employeeService.form.reset();
    this.employeeService.initializFormGroup();

  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    if (this.employeeService.form.valid) {
      if (!this.employeeService.form.get('$key').value) {
        this.employeeService.insertEmployee(this.employeeService.form.value);
      } else {
        this.employeeService.updateEmployer(this.employeeService.form.value)
      }
      this.employeeService.form.reset();
      this.employeeService.initializFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onClose() {
    this.employeeService.form.reset();
    this.employeeService.initializFormGroup();
    this.dialogRef.close()
  }
}

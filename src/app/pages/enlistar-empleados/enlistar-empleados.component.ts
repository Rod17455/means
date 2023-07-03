import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';


@Component({
  selector: 'app-enlistar-empleados',
  templateUrl: './enlistar-empleados.component.html',
  styleUrls: ['./enlistar-empleados.component.css']
})
export class EnlistarEmpleadosComponent implements OnInit {

  //propiedades
  empleados:any = [];

  constructor(private empleadoService:EmpleadoService){
    this.getEmpleados();

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  //MÉTODO PARA OBTENER LOS EMPLEADOS
  getEmpleados(){
    this.empleadoService.getEmpleados().subscribe((data => {
      this.empleados = data;
    }))
  }

  //Método para eliminar un empleado
  //metodo para eliminar empleado
  eliminarEmpleado(empleado,index) {
    if(window.confirm('¿Estas seguro de que lo deseas eliminar?')){
      this.empleadoService.deleteEmpleado(empleado._id)
        .subscribe((data)=>{
          this.empleados.splice(index,1);
        })
    }
  }





}

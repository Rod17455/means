import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';


@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {

  //propiedades
  enviado = false;
  empleadoDepartamento: any = [
    'Administración',
    'Finanzas', 'RH', 'TI','Ventas'
  ];
  editarForm: FormGroup;
  empleadoData: Empleado[];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private empleadoService: EmpleadoService,
    private actRoute: ActivatedRoute
  ){}


  ngOnInit(): void {
    this.mainForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmpleado(id);

    this.editarForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      departamento: ['', [Validators.required]],
      email: ['',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      telefono: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ],

      ]
    });
  }

  mainForm(){
    this.editarForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      departamento: ['', [Validators.required]],
      email: ['',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      telefono: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ],

      ]
    })
  }

  actualizarDepartamento(d){
    this.editarForm.get('departamento').setValue(d,{
      onlySelf: true,

    });
  }

  //Getter para acceder a los controles del formulario
  get myForm(){
    return this.editarForm.controls;
  }

  //MÉTODO PARA BUSCAR EL EMPLEADO QUE SE VA A MODIFICAR
  getEmpleado(id){
    this.empleadoService.getEmpleado(id).subscribe((data) => {
      this.editarForm.setValue({
        nombre: data['nombre'],
        departamento: data['departamento'],
        email: data['email'],
        telefono: data['telefono']
      });
    })
  }

  //Método que se ejecuta cuando se envia el formulario
  onSubmit(){
    this.enviado = true;
    if(!this.editarForm.valid){
      return false;
    } else {
      if(window.confirm('¿Estás seguro que lo deseas editar este usuario?')){
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.empleadoService.updateEmpleado(id,this.editarForm.value)
          .subscribe({
            complete: () => {
              this.router.navigateByUrl('/listar-empleados');
              console.log('Se actualizo correctamente')
            },
            error: (e) => {
              console.log(e);
            }
          })
      }
    }
  }

}

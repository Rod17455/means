import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  //baseUri: string = 'http://localhost:4000/api';
  baseUri: string = 'https://empleados-ds01sv22.onrender.com/api';
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { }

  //METODO PARA AGREGAR UN NUEVO EMPLEADO
  agregarEmpleado(data):Observable<any> {
    let url = `${this.baseUri}/create` ; //checar comas
    return this.http.post(url,data).pipe(catchError(this.errorManager));
  }

  //METODO PARA OBTENER TODOS LOS EMPLEADOS
  getEmpleados() {
    let url = `${this.baseUri}/empleados` ;
    return this.http.get(url);
  }

  //MÉTODO PARA OBTENER UN SOLO EMPLEADO POR SU ID

  getEmpleado(id):Observable<any>{
    let url = `${this.baseUri}/empleado/${id}` ;
    return this.http.get(url,{headers: this.headers})
      .pipe(map((res:Response) => {
        return res || {};
      }),
      catchError(this.errorManager)
      );
  }

  //MÉTODO PARA ACTUALIZAR UN EMPLEADO

  updateEmpleado(id,data):Observable<any>{
    let url = `${this.baseUri}/update/${id}` ;
    return this.http.put(url,data, {headers: this.headers})
      .pipe(catchError(this.errorManager));
  }

  //ELIMINAR EMPLEADO

  deleteEmpleado(id):Observable<any>{
    let url = `${this.baseUri}/delete/${id}` ;
    return this.http.delete(url, {headers: this.headers})
      .pipe(catchError(this.errorManager));
  }

  //MANEJADOR DE ERRORES
  errorManager(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      // el error esta del lado del cliente
      errorMessage = error.error.message;
    } else {
      // del lado del servidor
      errorMessage = `Código de error: ${error.status} \n Mensaje ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }


}

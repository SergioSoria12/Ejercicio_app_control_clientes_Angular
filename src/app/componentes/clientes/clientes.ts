import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';
import { Cliente } from '../../modelo/cliente.modelo';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes {

  clientes: Cliente[] | null = null;

  cliente: Cliente = {
    nombre:'',
    apellido:'',
    email:'',
    saldo: undefined
  };

  @ViewChild('botonCerrar') botonCerrar!: ElementRef;
  
  constructor(private clienteServicio: ClienteService){}

  ngOnInit(){
    this.clienteServicio.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  /*getSaldoTotal(): number {
    let saldoTotal: number = 0;
    if(this.clientes){
      this.clientes.forEach(cliente => {
        if(cliente.saldo !== undefined){
          saldoTotal += cliente.saldo;
        }
      })
    }
    return saldoTotal;
  }*/

  // Sintaxsis mas moderna
  getSaldoTotal(): number{
    return this.clientes?.reduce((total, cliente) => total + (cliente.saldo ?? 0), 0) ?? 0;
  }

  agregar(clienteForm: NgForm) {
    const {value, valid} = clienteForm;
    
    if(valid){
      //Agregamos la lógica pra guardar el cliente
      this.clienteServicio.agregarCliente(value);
      //Limpiamos el formulario
      clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}

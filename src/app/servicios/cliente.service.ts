import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/cliente.modelo';
import { Firestore, addDoc, collection, orderBy, query, docData, collectionSnapshots } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { doc } from '@angular/fire/firestore';
import { deleteDoc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clientes: Observable<Cliente[]>;
  private clientesRef: any;

  constructor(private firestore: Firestore){
    // Realizamos una consulta para obtener el listado de clientes
    this.clientesRef = collection(this.firestore, 'clientes');
    const consulta = query(this.clientesRef, orderBy('nombre', 'asc'));
    this.clientes = collectionSnapshots(consulta).pipe(
      map((snapshots: any[]) =>
        snapshots.map((snap: any) => ({
          id: snap.id,
          ...snap.data()
        }))
      )
    ) as Observable<Cliente[]>;
  }

  getClientes(): Observable<Cliente[]>{
    return this.clientes;
  }

  agregarCliente(cliente: Cliente){
    return addDoc(this.clientesRef, cliente);
  }

  getCliente(id: string): Observable<Cliente | null>{
    const clienteDocRef = doc(this.firestore, `clientes/${id}`);
    return docData(clienteDocRef, {idField: 'id'}) as Observable<Cliente>;
  }

  modificarCliente(cliente: Cliente){
    const clienteDoc = doc(this.firestore, `clientes/${cliente.id}`);
    return updateDoc(clienteDoc, {...cliente});
  }

  eliminarCliente(cliente: Cliente){
    const clienteDoc = doc(this.firestore, `clientes/${cliente.id}`);
    return deleteDoc(clienteDoc)
  }
}

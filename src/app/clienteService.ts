import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class clienteService {

  static REPO_CLIENTES = "Clientes"

  constructor() { }

  salvar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente);

    localStorage.setItem(clienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  atualizar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.forEach(c => {
      if (c.id === cliente.id) {
        Object.assign(c, cliente);
      }
    })
    localStorage.setItem(clienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  deletar(cliente: Cliente) {
    const storage = this.obterStorage();

    const novaLista = storage.filter(c => c.id !== cliente.id)

    localStorage.setItem(clienteService.REPO_CLIENTES, JSON.stringify(novaLista));
  }

  pesquisarCliente(nomeBusca: string): Cliente[] {

    const cliente = this.obterStorage();

    if (!nomeBusca) {
      return cliente;
    }

    return cliente.filter(cliente => cliente.nome?.indexOf(nomeBusca) !== -1)
  }

  buscarClientePorId(id: string): Cliente | undefined {
    const cliente = this.obterStorage();
    return cliente.find(cliente => cliente.id === id)
  }

  private obterStorage(): Cliente[] {
    const repositorioClientes = localStorage.getItem(clienteService.REPO_CLIENTES);
    if (repositorioClientes) {
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(clienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }

}

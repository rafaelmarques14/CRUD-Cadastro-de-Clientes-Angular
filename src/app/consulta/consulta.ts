import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms'
import { MatTableModule } from '@angular/material/table'
import { MatSnackBar } from '@angular/material/snack-bar'
import { NgxMaskDirective } from 'ngx-mask';
import { Cliente } from '../cadastro/cliente';
import { clienteService } from '../clienteService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    CommonModule,
    NgxMaskDirective
  ],
  standalone: true,
  providers: [],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss'
})
export class Consulta implements OnInit {

  nomeBusca: string = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ["id", "nome", "cpf", "dataNascimento", "email", "acoes"];
  snack: MatSnackBar = inject(MatSnackBar)

  constructor(private service: clienteService,
    private router: Router) {
  }

  ngOnInit() {
    this.listaClientes = this.service.pesquisarCliente('');
  }

  pesquisar() {
    this.listaClientes = this.service.pesquisarCliente(this.nomeBusca)
  }

  formatarCPF(cpf: string): string {
    if (!cpf) {
      return '';
    }
    const cpfApenasNumeros = cpf.replace(/\D/g, '');
    const cpfPad = cpfApenasNumeros.padStart(11, '0');
    return cpfPad.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarData(data: string | undefined): string {
    if (!data) {
      return '';
    }

    if (data.includes('/')) {
      return data;
    }

    if (data.includes('-')) {
      const partes = data.split('-');
      if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
      }
    }

    if (data.length === 8 && /^\d+$/.test(data)) {
      const dia = data.substring(0, 2);
      const mes = data.substring(2, 4);
      const ano = data.substring(4, 8);
      return `${dia}/${mes}/${ano}`;
    }

    return data;
  }


  preparaEditar(id: string | undefined) {
    this.router.navigate(['/cadastro'], { queryParams: { "id": id } })
  }

  preparaDeletar(cliente: Cliente) {
    cliente.deletando = true;
  }

  deletar(cliente: Cliente) {
    this.service.deletar(cliente);
    this.listaClientes = this.service.pesquisarCliente('');
    this.snack.open('Cliente deletado com sucesso!', 'Ok');
  }
}
import {Injectable} from '@angular/core';
import {ColumnModel} from "@core/interfaces";

@Injectable({
  providedIn: 'root'
})

export class ColsService {
  constructor() {
  }

  get catalogue(): ColumnModel[] {
    return [
      {field: 'name', header: 'Nombre'},
      {field: 'description', header: 'Descripción'},
    ];
  }
}

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WordSharedService } from 'src/app/word-shared.service';
import { MatTable } from '@angular/material/table';


import { CommonModule } from '@angular/common';
// import { UseData } from '../models';
export interface UserData {
  id: string;
  name: string;
}

export interface WordData {
  word: string;
  frequency: number;
}

@Component({
  selector: 'app-result-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatInputModule, MatFormFieldModule, MatSortModule],
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})

export class ResultTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['word', 'frequency'];
  dataSource: MatTableDataSource<WordData>;
  sharedDict: { [key: string]: any };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private wordSharedService: WordSharedService) {
  }

  ngAfterViewInit() {
    this.wordSharedService.sharedDict$.subscribe(value => {
      console.log('Valor que viene del servicio: ', value);
      this.sharedDict = value; 
      console.log('Valor local del segundo sibling', this.sharedDict);
      this.updateDataSource();
    }) // subscribe to the shared string changes from the service

    this.dataSource!.paginator = this.paginator;
    this.dataSource!.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateDataSource() {
    // You can update the data source like this:
    const rawData = this.sharedDict;
    const data = Object.entries (rawData).map ( ( [word, frequency]) => ( {word, frequency}));
    this.dataSource = new MatTableDataSource(data);
  
    this.dataSource = new MatTableDataSource(data);
    this.table.renderRows(); // This refreshes the table view
    this.dataSource!.paginator = this.paginator;
    this.dataSource!.sort = this.sort;
  }
}


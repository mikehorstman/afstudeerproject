import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { RapportToetsonderdeel } from "../../models/rapport.model";

@Component({
    selector   : 'app-tabel',
    templateUrl: './tabel.component.html',
    styleUrls  : ['./tabel.component.scss']
})
export class TabelComponent implements OnInit {
    @Input() data!: any;
    @Input() displayedColumns!: { naam: string, value: string[] }[];

    @Output() selected = new EventEmitter<any>();

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<any>(this.data);

        this.dataSource.filterPredicate = (data: any, filter: string) => {
            return data.toetsOnderdeel.naam.toLocaleLowerCase().includes(filter) ||
                   data.toetsOnderdeel.schoolMethodeToets.meestRecenteAfnameDatum.toLocaleLowerCase().includes(filter) ||
                   data.toetsOnderdeel.schoolMethodeToets.naam.toLocaleLowerCase().includes(filter) ||
                   data.toetsOnderdeel.schoolMethodeToets.schoolvak.toLocaleLowerCase().includes(filter);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        this.dataSource = new MatTableDataSource<any>(changes.data.currentValue);
        this.selection = new SelectionModel<any>(true, []);
    }

    dataSource!: MatTableDataSource<any>;
    selection = new SelectionModel<any>(true, []);

    /**
     * Checks if all the rows in the table are selected.
     */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /**
     * Applies a filter on the array when searching.
     *
     * @param event
     */
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    toggleRow(row: any) {
        this.selection.toggle(row)
        this.selected.emit(this.selection.selected);
    }

    getColumns() {
        return this.displayedColumns.map(column => {
            return column.naam
        })
    }

    masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.selection.select(...this.dataSource.data);
        this.selected.emit(this.selection.selected);
    }

    getTableValue(element: RapportToetsonderdeel, data: string[]) {
        let value = element;
        for (let i = 0; i < data.length; i++) {
            value = value[data[i]];
        }
        return value.toString();
    }

    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.toetsnaam + 1}`;
    }
}

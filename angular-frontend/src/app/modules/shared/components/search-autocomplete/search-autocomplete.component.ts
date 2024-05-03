import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrl: './search-autocomplete.component.scss',
})
export class SearchAutocompleteComponent {
  myControl = new FormControl('');
  @Input() label: string = '';
  @Input() options: string[] = [];
  filteredOptions!: Observable<string[]>;
  @Output() categorySelected = new EventEmitter<string>();
  @Output() inputValue = new EventEmitter<string>();

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.inputValue.emit(filterValue); // Emitting the typed value
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  optionSelected(option: string) {
    this.categorySelected.emit(option); // Emitting the selected option
  }
}

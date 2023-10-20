
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DataService } from 'src/app/data.service';
import { WordSharedService } from 'src/app/word-shared.service';

@Component({
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  selector: 'app-form-words',
  templateUrl: './form-words.component.html',
  styleUrls: ['./form-words.component.scss']
})
export class FormWordsComponent implements OnInit{
  data: any;
  file: any;
  formData = {
    name: 'test',
    age: 22
  }
  constructor(private dataService: DataService, fileInput: ElementRef, private wordSharedService: WordSharedService) { }
  sharedDict: { [key: string]: any };
  ngOnInit(): void {
    this.wordSharedService.sharedDict$.subscribe(value => {
      this.sharedDict = value; // subscribe to the shared string changes from the service
    });
  }

  @ViewChild('fileInput') fileInput: ElementRef;
  fileName = '';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
      this.fileName = file.name;
      this.data = file;
      // You can also read the file content using FileReader API
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e.target.result);
      };
      reader.readAsText(file);
    }
  }

  getData() {
    this.dataService.getData().subscribe((data: any) => {
      this.data = data;
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0]);
    this.dataService.postData(formData).subscribe({
      next: (response) => {
          console.log(response);
          this.sharedDict = response
          this.wordSharedService.setSharedDict(response);
          console.log(this.file);
          console.log('SHARED_DICT_First_sibling', this.sharedDict);
      },
      error: (e) => console.error(e)
    });
    console.log('Submit button clicked');
  }
}
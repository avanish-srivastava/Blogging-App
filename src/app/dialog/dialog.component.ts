import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  bloggingForm !: FormGroup;
  actionBtn: string = "Save";
  constructor(private formBuilder: FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.bloggingForm = this.formBuilder.group({
      Title : ['', Validators.required],
      Description : ['', Validators.required]
  });

  if(this.editdata){
    this.actionBtn = "Update";
    this.bloggingForm.controls['Title'].setValue(this.editdata.Title);
    this.bloggingForm.controls['Description'].setValue(this.editdata.Description);
  }
}

postBlog(){
  if(!this.editdata){
    if(this.bloggingForm.valid){
      this.api.addBlog(this.bloggingForm.value)
      .subscribe({
        next:(res)=> {
  
          alert("Post added successfully")
          this.bloggingForm.reset();
          this.dialogRef.close('save');
        
  
        },
        error:() => {
          alert("Error while posting a blog")
        }
      })

    }
  }
     else{
     this.updateBlog()
    }
  }

  updateBlog(){
    this.api.putBlog(this.bloggingForm.value, this.editdata.id)
    .subscribe({
      next:(res)=> {
        alert("Blog updated successfully");
        this.bloggingForm.reset();
        this.dialogRef.close('update');
      },error:()=>{
        alert("Error while updating the record")
      }
    })

  }
}


//json-server --watch db.json 
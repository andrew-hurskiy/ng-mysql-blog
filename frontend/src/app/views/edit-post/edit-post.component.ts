import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  blogForm: FormGroup;
  author: any;
  constructor(
    private fb: FormBuilder,
    private readonly api: PostService,
    private readonly router: Router,
  ) {
    this.initForm();
  }

  ngOnInit(): void {}

  initForm() {
    this.author = JSON.parse(localStorage.getItem('user'));
    let createdAtMysqlFormat = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    this.blogForm = this.fb.group({
      id: [uuidv4()],
      author: [this.author],
      heading: ['', Validators.required],
      subHeading: ['', Validators.required],
      section1: [''],
      section2: [''],
      section3: [''],
      sectionHeading: [''],
      createdAt: [createdAtMysqlFormat],
    });
  }

  submit() {
    console.log('formGroup', this.blogForm.value);
    this.api.addPost(this.blogForm.value).subscribe((res) => {
      console.log('res', res);
      alert('Blog created!');
      this.router.navigateByUrl('/home');
    });
  }
}

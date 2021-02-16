import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Comment } from "../../shared/comment";
import { Dish } from "../../shared/dish";

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-comments",
  templateUrl: "comments.html",
})
export class CommentsPage {
  comment: Comment;
  commentForm: FormGroup;
  currentdate: Date;
  dish: Dish;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private viewCtrl: ViewController
  ) {
    this.currentdate = new Date();
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ["", Validators.required],
      author: ["", Validators.required],
      date: this.currentdate.toDateString(),
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.currentdate.toDateString()
    console.log(this.commentForm.value);
    this.viewCtrl.dismiss();
    this.dish.comments.push(this.comment);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CommentsPage");
  }
}

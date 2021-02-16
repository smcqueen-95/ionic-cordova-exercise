import { Component, Inject, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ActionSheetController,
  ModalController,
} from "ionic-angular";
import { Dish } from "../../shared/dish";
import { Comment } from "../../shared/comment";
import { FavoriteProvider } from "../../providers/favorite/favorite";
import { CommentsPage } from "../comments/comments";

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-dishdetail",
  templateUrl: "dishdetail.html",
})
export class DishdetailPage implements OnInit {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;
  comment: Comment;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject("BaseURL") private BaseURL,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,
    private actionCtrl: ActionSheetController,
    private modalCtrl: ModalController
  ) {
    this.dish = navParams.get("dish");
    this.favorite = this.favoriteservice.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach((comment) => (total += comment.rating));
    this.avgstars = (total / this.numcomments).toFixed(2);
  }

  ngOnInit() {}
  ionViewDidLoad() {
    console.log("ionViewDidLoad DishdetailPage");
  }

  addToFavorites() {
    console.log("Adding to Favorites", this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl
      .create({
        message: "Dish " + this.dish.id + " added as favorite successfully",
        position: "middle",
        duration: 3000,
      })
      .present();
  }

  async openActionSheet() {
    const actionSheet = await this.actionCtrl.create({
      title: "Select Action",
      buttons: [
        {
          text: "Add to Favorites",
          handler: () => {
            this.addToFavorites();
          },
        },
        {
          text: "Add Comment",
          handler: () => {
            this.openAddComment();
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
    await actionSheet.present();
  }

  openAddComment(){
    let modal = this.modalCtrl.create(CommentsPage);
    modal.present();

   
  }
  
}

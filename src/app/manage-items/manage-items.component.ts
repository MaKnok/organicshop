import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ManageItemsService } from './manage-items.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.scss'],
})
export class ManageItemsComponent implements OnInit {

  @ViewChild('categoryButton', { static: false })

  set categoryButton(element: ElementRef<HTMLInputElement>) {
    if(element) {
      element.nativeElement.focus();
    }
  }
  
  categories$: Observable<Category[]>;
  categoryId: string = '';
  subscription: Subscription;

  FOOD_CAT: string = 'cat-food';
  HEALTH_CAT: string = 'cat-health';
  SUP_CAT: string = 'cat-sup';
  BEAUTY_CAT: string = 'cat-beauty';

  constructor(
    private manageItemsService: ManageItemsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.manageItemsService.getCategories().subscribe({
      next: (res) => {
        this.categories$ = res;
        console.log('Categories', res);
        this.gotoCategory(res[0]);
      },
      error: (error) => {
        console.log('There was an error in Categories! >>', error);
      },
      complete: () => console.info('Categories were successfully gotten!'),
    });
  }

  gotoCategory(category: Category) {
    this.router.navigate(['/manage-item', { id: category.id }]);
    this.manageItemsService.setChosenCategory(this.categoryId); 
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
    console.log("Manage items unsubscribed");
  }

}

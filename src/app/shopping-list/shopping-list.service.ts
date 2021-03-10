import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {
    ingredientsChange = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient ('Apples', 5),
        new Ingredient ('Tomatoes', 10),
      ];

    getIngredient() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChange.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
    // This would be fine, but it will take a lot of emmiting events
    //     for (let ingredient of ingredients) {
    //         this.addIngredient(ingredient);
    //     }
        this.ingredients.push(...ingredients);
        this.ingredientsChange.next(this.ingredients.slice());
    }
}
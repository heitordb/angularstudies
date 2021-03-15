import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Tacos',
         'Chupa Guaco', 
         'https://www.kitano.com.br/wp-content/uploads/2019/08/Kitano-RecipeImages-770x550-Guacamole.jpg',
         [
             new Ingredient('flour', 1),
             new Ingredient('Avocado', 2),
             new Ingredient('tomatoes', 3)
         ]),
        new Recipe('Pudim',
         'Só não é melhor que o da minha mãe',
          'https://www.sabornamesa.com.br/media/k2/items/cache/2660be2b2df02c41fc17abdbfc676d66_L.jpg',
          [
              new Ingredient('sugar', 3),
              new Ingredient('flour', 3)
          ])
      ];

      constructor(private slService: ShoppingListService) {}
    
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToSl(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}
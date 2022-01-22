import { AllTheThingsAD } from './AllTheThingsAD';
import { ITestCase, testData } from './testData';
import { IReagentsList, IRecipeInfo, RecipeCache, Result } from './types';

class app {
    
    static GetAbsoluteReagentNumInRecipe(sourceItemID: string, targetItemID: string, reagents: IReagentsList, recipeCache: RecipeCache = {}, calculateNested: boolean, debugNestLevel: number): Result {
        console.log(' '.repeat(debugNestLevel * 4) + 'GetAbsoluteReagentNumInRecipe', { sourceItemID, targetItemID });
        let reagentMinCount = 0, reagentMaxCount = 0;
        const reagentsKeys = Object.keys(reagents); // In LUA we can simply do #reagents because it is an array; limitation of conversion
        
        // Doesn't make sense to handle recipes that require the item to create itself (like ore prospecting)
        if (reagentsKeys.length === 1 && reagents['1']['1'].toString() === targetItemID) {
            return { min: 0, max: 0 };
        }
        
        // Loop over all reagents
        for (let reagentIndex of reagentsKeys) {
            const reagent = reagents[reagentIndex];
            const reagentID = reagent['1'].toString();
            const quantity = reagent['2'];
            
            // If reagentID is our sourceItemID, add quantity required
            if (reagentID === sourceItemID) {
                reagentMinCount += quantity;
                reagentMaxCount += quantity;
            // } else if (reagentID is in notCollected) {
            } else if (calculateNested) {
                // Check if other reagentID could be crafted using sourceItemID
                const extra = app.GetReagentNumToCraftItem(sourceItemID, reagentID, quantity, recipeCache, calculateNested, debugNestLevel);
                reagentMinCount += extra.min;
                reagentMaxCount += extra.max;
            }
        }
        
        return { min: reagentMinCount, max: reagentMaxCount };
    }
    
    static GetReagentNumToCraftItem(sourceItemID: string, targetItemID: string, neededQuantity = 1, recipeCache: RecipeCache = {}, calculateNested: boolean, debugNestLevel: number = 0): Result {
        console.log(' '.repeat(debugNestLevel * 4) + 'GetReagentNumToCraftItem', { sourceItemID, targetItemID, neededQuantity });
        
        let reagentMinCount = null, reagentMaxCount = null;
        let itemRecipes = AllTheThingsAD.Recipes[targetItemID]; // LUA code: itemRecipes = app.GetDataSubMember("Recipes", targetItemID);
        
        if (itemRecipes) {
            for (let recipeID of Object.keys(itemRecipes)) {
                const info: IRecipeInfo = itemRecipes[recipeID];
                const reagents = info['1'];
                const producedMin = info['2']['1'];
                const producedMax = info['2']['2'];
                let recipeResult: Result = recipeCache[recipeID];
                
                if (typeof recipeResult === 'undefined') {
                    // This is a way to handle recursive recipes, specifically transmutations. It will return correct results.. right?
                    recipeCache[recipeID] = { min: 0, max: 0 };
                    recipeResult = app.GetAbsoluteReagentNumInRecipe(sourceItemID, targetItemID, reagents, recipeCache, calculateNested, debugNestLevel + 1);
                    recipeCache[recipeID] = recipeResult;
                }
                
                // In some cases for multiple items the ceiling here will accumulate an error
                const newMin = recipeResult.min * Math.ceil(neededQuantity / producedMax);
                const newMax = recipeResult.max * Math.ceil(neededQuantity / producedMin);
                
                if (reagentMinCount === null || newMin < reagentMinCount) reagentMinCount = newMin;
                if (reagentMaxCount === null || newMax > reagentMaxCount) reagentMaxCount = newMax;
            }
        } else {
            reagentMinCount = 0;
            reagentMaxCount = 0;
        }
        
        return { min: reagentMinCount, max: reagentMaxCount };
    }
    
    public static getReagentNum(data: ITestCase): Result {
        let totalReagentCount: Result = { min: 0, max: 0 };
        
        for (let targetItem of data.contains) {
            const reagentCount = app.GetReagentNumToCraftItem(data.itemID, targetItem.itemID, 1, {}, true);
            console.log(` - Item ${targetItem.itemID} requires`, reagentCount);
    
            totalReagentCount.min += reagentCount.min;
            totalReagentCount.max += reagentCount.max;
        }
        
        return totalReagentCount;
    }
}

console.log(`Total required:`, app.getReagentNum(testData.oxxeinOre));

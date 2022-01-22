interface Result {
    min: number;
    max: number;
}

export interface RecipeCache {
    [recipeID: string]: Result;
}

export interface IATTData {
    Recipes: {
        [itemID: string]: {
            [recipeID: string]: IRecipeInfo;
        }
    };
}

export interface IRecipeInfo {
    '1': IReagentsList,
    '2': {
        '1': number; // produced min
        '2': number; // produced max
    }
}

export interface IReagentsList {
    [reagentIndex: string]: {
        '1': number; // itemID
        '2': number; // quantity
    }
}

// The other object that already exists in ATT
interface IReagents {
    [itemID: string]: {
        '1': {
            [recipeID: string]: {
                '1': number; // craftedItemID
                '2': number; // reagentCount
            }
        },
        '2': {
            [craftedItemID: string]: number; // reagentCount
        }
    }
}

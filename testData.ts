export interface ITestItem {
    itemID: string,
    min?: number; // Manually calculated value, intended to be used in automatic validation of calculation
    max?: number; // Manually calculated value, intended to be used in automatic validation of calculation
}

export interface ITestCase extends ITestItem {
    contains: ITestItem[];
}

// This is bases on my personal progress, you can generate your own set of data with the debug version of the implementation here: https://github.com/lOlbas/AllTheThings/tree/feature/crafting-calculation-debug
export const testData: { [key: string]: ITestCase } = {
    // https://wowhead.com/item=76061
    spiritOfHarmony: {
        itemID: '76061',
        min: 47,
        max: 248,
        contains: [{
            itemID: '94575', //https://wowhead.com/item=94575
            min: 3,
            max: 9
        }, {
            itemID: '94577', //https://wowhead.com/item=94577
            min: 6,
            max: 27
        }, {
            itemID: '94579', //https://wowhead.com/item=94579
            min: 9,
            max: 54
        }, {
            itemID: '77528', //https://wowhead.com/item=77528
            min: 2,
            max: 2
        }, {
            itemID: '94582', //https://wowhead.com/item=94582
            min: 3,
            max: 12
        }, {
            itemID: '83090', //https://wowhead.com/item=83090
            max: 12
        }, {
            itemID: '83087', //https://wowhead.com/item=83087
            max: 12
        }, {
            itemID: '87405', //https://wowhead.com/item=87405
            min: 3,
            max: 27
        }, {
            itemID: '82976', //https://wowhead.com/item=82976
            min: 8,
            max: 23
        }, {
            itemID: '82980', //https://wowhead.com/item=82980
            min: 8,
            max: 23
        }, {
            itemID: '94265', //https://wowhead.com/item=94265
            min: 2,
            max: 20
        }, {
            itemID: '87402', //https://wowhead.com/item=87402
            min: 3,
            max: 27
        }]
    },
    
    // https://www.wowhead.com/item=171833
    elethiumOre: {
        itemID: '171833',
        contains: [{
            itemID: '171445'
        }, {
            itemID: '171447'
        }]
    },
    
    // https://wowhead.com/item=72093
    kyparite: {
        itemID: '72093',
        contains: [{
            itemID: '82974'
        }, {
            itemID: '82971'
        }, {
            itemID: '82972'
        }, {
            itemID: '82973'
        }, {
            itemID: '82970'
        }]
    },
    
    // https://wowhead.com/item=171828
    laestriteOre: {
        itemID: '171828',
        contains: [{
            itemID: '172923', // https://wowhead.com/item=172923
            min: 11,
            max: 13
        }, {
            itemID: '171447' // https://wowhead.com/item=171447
        }, {
            itemID: '171445' // https://wowhead.com/item=171445
        }]
    },
    
    //
    embersilkCloth: {
        itemID: '53010',
        contains: [{
            itemID: '75070'
        }]
    },
    
    //
    tidesprayLinen: {
        itemID: '152576',
        contains: [{
            itemID: '158378'
        }, {
            itemID: '168730'
        }, {
            itemID: '168733'
        }, {
            itemID: '168735'
        }, {
            itemID: '168736'
        }, {
            itemID: '168738'
        }, {
            itemID: '168739'
        }, {
            itemID: '168782'
        }, {
            itemID: '168784'
        }]
    },
    
    // https://wowhead.com/item=23427
    eterniumOre: {
        itemID: '23427',
        min: 0,
        max: 0,
        contains: [{
            itemID: '32756' // https://wowhead.com/item=32756
        }, {
            itemID: '23747' // https://wowhead.com/item=23747
        }, {
            itemID: '23537' // https://wowhead.com/item=23537
        }, {
            itemID: '23555' // https://wowhead.com/item=23555
        }, {
            itemID: '23540' // https://wowhead.com/item=23540
        }, {
            itemID: '31368' // https://wowhead.com/item=31368
        }, {
            itemID: '32854' // https://wowhead.com/item=32854
        }, {
            itemID: '23526' // https://wowhead.com/item=23526
        }, {
            itemID: '23542' // https://wowhead.com/item=23542
        }, {
            itemID: '23543' // https://wowhead.com/item=23543
        }, {
            itemID: '32570' // https://wowhead.com/item=32570
        }, {
            itemID: '23544' // https://wowhead.com/item=23544
        }, {
            itemID: '23546' // https://wowhead.com/item=23546
        }, {
            itemID: '23531' // https://wowhead.com/item=23531
        }, {
            itemID: '32568' // https://wowhead.com/item=32568
        }, {
            itemID: '23533' // https://wowhead.com/item=23533
        }, {
            itemID: '24123' // https://wowhead.com/item=24123
        }, {
            itemID: '31364' // https://wowhead.com/item=31364
        }, {
            itemID: '31367' // https://wowhead.com/item=31367
        }, {
            itemID: '23554' // https://wowhead.com/item=23554
        }, {
            itemID: '23556' // https://wowhead.com/item=23556
        }]
    },
    
    // https://wowhead.com/item=171830
    oxxeinOre: {
        itemID: '171830',
        contains: [{
            itemID: '171445' // https://wowhead.com/item=171445
        }, {
            itemID: '171447' // https://wowhead.com/item=171447
        }]
    }
};

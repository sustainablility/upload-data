let assert = require('chai').assert;
let arrayFormat = require('../src/arrayFormatByDataType');
let sampleArray1 = [
    [
        'a',
        'b',
        'c'
    ],
    [
        '1',
        '2',
        '3'
    ],
    [
        '6',
        '7',
        '8'
    ]
];
let sampleArray2 = [
    [
        'a',
        'a',
        'a',
        'b',
        'c'
    ],
    [
        '1',
        '2',
        '3',
        '0',
        '9'
    ],
    [
        '6',
        '7',
        '8',
        '1',
        '2'
    ]
];

let sampleArray3 = [
    [
        'a',
        'a',
        'a',
        'b',
        'c'
    ],
    [
        'a',
        '2',
        '3',
        '0',
        '9'
    ],
    [
        'a',
        '7',
        '8',
        '1',
        '2'
    ],
    [
        '6',
        '7',
        '8',
        '1',
        '2'
    ],
    [
        '7',
        '7',
        '8',
        '1',
        '2'
    ]
];

let sampleArray4 = [
    [
        'a',
        'b',
        'c'
    ],
    [
        '1',
        '2'
    ],
    [
        '6',
        '7'
    ]
];

describe("Unit Test for data array formation in different data type",function () {
    it('Testing for non-shaped dataset', function (done) {
        let sample = sampleArray4.slice();
        let result = arrayFormat(sample,0);
        let expected = [
            [
                1,
                2,
                3
            ],
            [
                'a',
                'b',
                'c'
            ],
            [
                '1',
                '2',
                null
            ],
            [
                '6',
                '7',
                null
            ]
        ];
        assert.equal(result.sort().toString(),expected.sort().toString(),"Result data and expected data does not match, or shaping function error");
        done();
    });

    it('Type 0, non-title data, and data group in row', function (done) {
        let sample = sampleArray1.slice();
        let result = arrayFormat(sample,0);
        let expected = [
            [
                1,
                2,
                3
            ],
            [
                'a',
                'b',
                'c'
            ],
            [
                '1',
                '2',
                '3'
            ],
            [
                '6',
                '7',
                '8'
            ]
        ];
        assert.equal(result.sort().toString(),expected.sort().toString(),"Result data and expected data does not match");
        done();
    });

    it('Type 1, first-row-title data', function (done) {

        // For normal input:
        let sample1 = sampleArray1.slice();
        let result = arrayFormat(sample1,1);
        let expected = [
            [
                'a',
                'b',
                'c'
            ],
            [
                '1',
                '2',
                '3'
            ],
            [
                '6',
                '7',
                '8'
            ]
        ];
        assert.equal(result.sort().toString(),expected.sort().toString(),"Something wrong in Type 1 data test, normal data's result does not match the expected result");

        // For duplicated title:
        let sample2 = sampleArray2.slice();
        let duplicatedResult = arrayFormat(sample2,1);
        let duplicatedExpected = [
            [
                'a',
                'a+',
                'a++',
                'b',
                'c'
            ],
            [
                '1',
                '2',
                '3',
                '0',
                '9'
            ],
            [
                '6',
                '7',
                '8',
                '1',
                '2'
            ]
        ];
        assert.equal(duplicatedResult.sort().toString(),duplicatedExpected.sort().toString(),"Something wrong in Type 1 data test, duplicated title data's result does not match the expected result");
        done()
    });

    it('Type 2, first-column-title data', function (done) {

        // For normal data
        let sample1 = sampleArray1.slice();
        let result = arrayFormat(sample1,2);
        let expected = [
            [
                'a',
                '1',
                '6'
            ],
            [
                'b',
                '2',
                '7'
            ],
            [
                'c',
                '3',
                '8'
            ]
        ];
        assert.equal(result.sort().toString(),expected.sort().toString(),"Something wrong in Type 2 data test, data's result does not match the expected result");


        // For duplicated Title data
        let sample2 = sampleArray3.slice();

        let anotherResult = arrayFormat(sample2,2);

        let anotherExpected = [
            [
                'a',
                'a+',
                'a++',
                '6',
                '7'
            ],
            [
                'a',
                '2',
                '7',
                '7',
                '7'
            ],
            [
                'a',
                '3',
                '8',
                '8',
                '8'
            ],
            [
                'b',
                '0',
                '1',
                '1',
                '1'
            ],
            [
                'c',
                '9',
                '2',
                '2',
                '2'
            ]
        ];

        assert.equal(anotherResult.sort().toString(),anotherExpected.sort().toString(),"Something wrong in Type 2 data test, duplicated title data's result does not match the expected result");

        done();

    });

    it('Type 3, non-title data, data group in column', function (done) {
        let sample = sampleArray1.slice();
        let result = arrayFormat(sample,3);
        let expected = [
            [
                1,
                2,
                3
            ],
            [
                'a',
                '1',
                '6'
            ],
            [
                'b',
                '2',
                '7'
            ],
            [
                'c',
                '3',
                '8'
            ]
        ];
        assert.equal(result.sort().toString(),expected.sort().toString(),"Result data and expected data does not match");
        done();
    });


});
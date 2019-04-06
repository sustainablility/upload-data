/**
 *  For array formation before putting the dataset array to model.
 *  The data would be formatted for model's requirement.
 *  And also fix the title duplication problem.
 *
 *  There are four types:
 *  type 0: non-title data, and each group of data distributed in each row.
 *  type 1: titles are in the first row
 *  type 2: titles are in the first column, and data has been grouped in each column.
 *  type 3: non-title data, and each group of data distributed in each column.
 *
 * @param array
 * @param type
 * @returns {Array}
 */
function arrayFormat(array,type) {

    switch (type) {
        
        // In case of no title array
        case 0:
            let title = [];
            for (let i = 0,len = array[0].length;i < len; i ++) {
                title.push(i + 1);
            }
            array.unshift(title);
            shapeArray(array);
            return array;

        case 1:
            let newTitles = renameDuplicatedTitle(array[0]);
            array.shift();
            array.unshift(newTitles);
            shapeArray(array);
            return array;

        case 2:
            let newArray = array[0].map(function(col, i) {
                return array.map(function(row) {
                    return row[i];
                })
            });
            let nonDupTitle = renameDuplicatedTitle(newArray[0]);
            newArray.shift();
            newArray.unshift(nonDupTitle);
            shapeArray(array);
            return newArray;

        case 3:
            let anotherNewArray = array[0].map(function(col, i) {
                return array.map(function(row) {
                    return row[i];
                })
            });
            let newTitle = [];
            for (let i = 0,len = anotherNewArray[0].length;i < len; i ++) {
                newTitle.push(i + 1);
            }
            anotherNewArray.unshift(newTitle);
            shapeArray(array);
            return anotherNewArray;
    }
}

exports.arrayFormat = arrayFormat;

/**
 * Once the function find duplicated things in titleArray, it would add a "+" on one of the duplicated item.
 * @param titleArray
 * @returns {Array}
 */
function renameDuplicatedTitle(titleArray) {
    let title = new Set();
    let newTitle = [];
    for (let i = 0,len = titleArray.length;i < len; i ++) {
        (
            function inserTitle(titleFromArray) {
                if (title.has(titleFromArray)) {
                    inserTitle(titleFromArray + "+")
                }else {
                    newTitle.push(titleFromArray);
                    title.add(titleFromArray);
                }
            }
        )(titleArray[i])
    }
    return newTitle;
}

/**
 * Make sure that the array is rectangle shape; if not, then use null to fill rest of the space
 * Also, it would automatically convert the number string into Number datatype
 * @param array
 */
function shapeArray(array) {
    let width = array[0].length;
    for (let i = 0,len = array.length;i < len; i ++) {
        for (let j = 0;j < width;j++) {
            if (array[i][j] === undefined) {
                array[i].push(null);
            }else {
                if (!isNaN(array[i][j])) {
                    array[i][j] = Number(array[i][j]);
                }
            }
        }
        array[0].splice(width);
    }
}
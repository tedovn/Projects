'use strict';

var app = app || {};

app.sequence = (function() {
    function Sequence(input) {
        if (!input) {
            input = "";
        }

        this._input = input;
    }

    Sequence.prototype.color = function() {
        return colorSequences(this._input);
    };

    var colorSequences = function(input) {
        var inputArray, i, oddNumberIndex,
            equalNumberIndex, str, oddNumbers, equalNumbers, len;

        equalNumbers = findEquelNumberSequence(input);
        oddNumbers = findOddNumberSequence(input);
        inputArray = input.split('');
        len = inputArray.length;
        for (i = 0; i < len; i++) {
            oddNumberIndex = oddNumbers.indexOf(i);
            equalNumberIndex = equalNumbers.indexOf(i);
            str = "";
            if (oddNumberIndex !== -1) {
                if (equalNumberIndex !== -1) {
                    str = inputArray[i].fontcolor('red').bold();
                    inputArray[i] = str;
                } else {
                    str = inputArray[i].fontcolor('red');
                    inputArray[i] = str;
                }
            } else {
                if (equalNumberIndex !== -1) {
                    str = inputArray[i].bold();
                    inputArray[i] = str;
                }

            }
        }

        return inputArray.join("");
    };

    var findEquelNumberSequence = function(textareaInput) {
        var count, maxCount, indexPositions, index, i, len;
        count = 1;
        maxCount = 1;
        indexPositions = {};
        index = 0;
        len = textareaInput.length;
        for (i = 0; i < len; i++) {

            if (textareaInput[i] === textareaInput[i + 1] && Number(textareaInput[i]) && Number(textareaInput[i + 1])) {
                count++;
                if (maxCount <= count) {
                    maxCount = count;
                    index = i + 2 - maxCount;
                    if (!indexPositions[maxCount]) {
                        indexPositions = {};
                        indexPositions[maxCount] = [];
                        indexPositions[maxCount].push(index);
                    } else {
                        indexPositions[maxCount].push(index);
                    }

                }
            } else {
                count = 1;
            }
        }


        return returnArrayOfNumbers(indexPositions[maxCount], maxCount);
    };

    var findOddNumberSequence = function(textareaInput) {
        var count, maxOddCount, indexPositions, index, i, len;
        count = 1;
        maxOddCount = 1;
        indexPositions = {};
        index = 0;
        len = textareaInput.length;
        for (i = 0; i < len; i++) {

            if ((textareaInput[i] % 2 !== 0) && (textareaInput[i + 1] % 2 !== 0) && Number(textareaInput[i]) && Number(textareaInput[i + 1])) {
                count++;
                if (maxOddCount <= count) {
                    maxOddCount = count;
                    index = i + 2 - maxOddCount;
                    if (!indexPositions[maxOddCount]) {
                        indexPositions = {};
                        indexPositions[maxOddCount] = [];
                        indexPositions[maxOddCount].push(index);
                    } else {
                        indexPositions[maxOddCount].push(index);
                    }

                }
            } else {
                count = 1;
            }
        }

        return returnArrayOfNumbers(indexPositions[maxOddCount], maxOddCount);
    };

    var returnArrayOfNumbers = function(numbers, maxCount) {
        var i, result = [];
        for (var num in numbers) {
            result.push(numbers[num]);
            for (i = 1; i <= maxCount - 1; i++) {
                result.push(numbers[num] + i);
            }
        }
        return result;
    };

    return {
        get: function(input) {
            return new Sequence(input);
        }
    };
}());
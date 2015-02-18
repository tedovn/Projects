'use strict';

var app = app || {};

function displayTextInDiv() {
   var displayResult, sequence, input;
    input = document.getElementById('input-text').value;
    sequence = app.sequence.get(input);
    displayResult = sequence.color();
    document.getElementById('display-input-text').innerHTML = displayResult;

}
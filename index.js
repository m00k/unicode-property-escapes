// https://unicode.org/reports/tr18/#General_Category_Property
var latinLettersNumeralsAndSpaceSeperator = /\p{Script=Latin}|\p{Nd}|\p{Zs}/gu;
var results = [];
var overall = 'OK';

var userAgentEl;
var regexEl;
var overallResultEl;
var resultsWrapper;
var resultsTable;

var ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var UMLAUTS = 'ÄäÜüÖöß';
var POLISH = 'ĄąĆćĘęŁłŃńÓóŚśŹźŻż';
var TURKISH = 'ÇçĞğŞş';

var letters =
    ABC +
    UMLAUTS +
    POLISH +
    TURKISH
    ;
var numbers = '0123456789';
var romanNumerals = 'ⅠⅡⅢⅣ';
var numberFractions = '½¼¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞⅟↉';
var ancientGreekNumerals = '𐅅';
var hinduArabicNumerals = 'א';
var thaiDigitZero = '๐';
var specialCharacters =
    '👌' +
    '`~!@#$%^&*()-_=+[]{}<>\\/|;:\'",.?' +
    '©®™•§†‡¶÷‰±°¢£€¥¤¡¿'
    ;
var space = ' ';
var horizontalTab = '\u0009';
var lineFeed = '\u000A';
var verticalTab = '\u000B';
var backspace = '\u0008';
var whitespaces =
    horizontalTab +
    lineFeed +
    verticalTab +
    backspace
    ;
var astralLetters = [
    String.fromCodePoint(0x1D7CB),
];
var expectedToMatch = (
    letters +
    numbers +
    romanNumerals +
    thaiDigitZero + // <-------------------------------- https://www.compart.com/en/unicode/U+0E
    space
).split('');
var expectedNotToMatch = (
    specialCharacters +
    numberFractions +
    whitespaces +
    astralLetters +
    hinduArabicNumerals +
    ancientGreekNumerals
).split('');

expectedToMatch.forEach(c => {
    validate(latinLettersNumeralsAndSpaceSeperator, true, c)
})
expectedNotToMatch.forEach(c => {
    validate(latinLettersNumeralsAndSpaceSeperator, false, c)
})

userAgentEl = document.getElementById('userAgent');
userAgentEl.innerText = window.navigator.userAgent;

regexEl = document.getElementById('regex');
regexEl.innerText = latinLettersNumeralsAndSpaceSeperator;

overallResultEl = document.getElementById('overall');
overallResultEl.innerText = overall;
overallResultEl.className = overall;

resultsTable = document.createElement('table');
generateTableHead(resultsTable, results[0]);
generateTable(resultsTable, results);
resultsWrapper = document.getElementById('results');
resultsWrapper.appendChild(resultsTable);

function validate(regEx, expected, candidate) {
    var match = !!candidate.match(regEx);
    var result = match === expected
        ? 'OK'
        : 'NOK';
    results.push({ candidate, match, result });
    if (match !== expected) {
        overall = 'NOK';
        console.warn(candidate, match, result);
    }
}

function generateTableHead(table, data) {
    var thead = table.createTHead();
    var row = thead.insertRow();
    Object.keys(data).forEach(key => {
        var th = document.createElement("th");
        var text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    });
}

function generateTable(table, data) {
    data.forEach(dataPoint => {
        var row = table.insertRow();
        Object.keys(dataPoint).forEach(key => {
            var cell = row.insertCell();
            if (dataPoint.result === 'NOK') {
                cell.className = dataPoint.result;
            }
            var text = document.createTextNode(dataPoint[key]);
            cell.appendChild(text);
        });
    });
}

// NOTE (cb): unicode property escapes do not work with test()
// console.log(r.test('A')); true
// console.log(r.test('A')); false
// console.log(r.test('A')); true
// console.log(r.test('A')); false
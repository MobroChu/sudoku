/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * 生成矩阵
 */
const matrixToolkit = {
    makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    },

    makeMatrix(v = 0) {
        return Array.from({ length: 9 }, () => this.makeRow(v));
    },

    shuffle(array) {
        const endIndex = array.length - 2;
        for (let i = 0; i <= endIndex; i++) {
            const j = i + Math.floor(Math.random() * (array.length - i));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    /**
     * 检查是否可以填入
     */
    checkFillable(matrix, n, rowIndex, colIndex) {
        const row = matrix[rowIndex];
        const column = this.makeRow().map((v, i) => matrix[i][colIndex]);
        const { boxIndex } = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
        const box = boxToolkit.getBoxCells(matrix, boxIndex);
        for (let i = 0; i < 9; i++) {
            if (row[i] === n || column[i] === n || box[i] === n) {
                return false;
            }
        }
        return true;
    }
};

/**
 * 宫坐标系
 * */

const boxToolkit = {
    getBoxCells(matrix, boxIndex) {
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3;
        const result = [];
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            const colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }

        return result;
    },
    convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },

    convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    }
};

// 工具集

module.exports = class Toolkit {
    /**
     * 矩阵和数据相关的工具
     */
    static get matrix() {
        return matrixToolkit;
    }

    /**
     * 宫坐标系相关的工具
     */
    static get box() {
        return boxToolkit;
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// 生成数独解决方案的

const Toolkit = __webpack_require__(0);
class Generator {
    generator() {
        while (!this.interGenerator()) {
            console.warn("When the system builds sudoku, more than once. ");
        }
    }
    interGenerator() {
        this.matrix = Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix().map(row => row.map((v, i) => i)).map(row => Toolkit.matrix.shuffle(row));

        // 入口方法
        for (let n = 1; n <= 9; n++) {
            if (!this.fillNumber(n)) {
                return false;
            }
        }
        return true;
    }

    fillNumber(n) {
        return this.fillRow(n, 0);
    }

    fillRow(n, rowIndex) {
        if (rowIndex > 8) {
            return true;
        }

        // 选择要填写的位置
        const row = this.matrix[rowIndex];
        const orders = this.orders[rowIndex];
        // 随机选择列
        for (let i = 0; i < 9; i++) {
            const colIndex = orders[i];
            if (row[colIndex]) {
                continue;
            }

            // 检查这个位置是否可以填入 
            if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                continue;
            }

            row[colIndex] = n;

            // 去填写下一行 n ，如果没填进去，就继续寻找当前行的下一个位置
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue;
            }

            return true;
        }

        return false;

        // 当前行填写 n 成功， 我们就要进行一个地柜调用 fillRow()
        this.fillRow(n, rowIndex + 1);
    }
}

module.exports = Generator;
// console.log((new Generator()).generator());
// const gen = new Generator();
// gen.generator();

// console.log(gen.matrix, "|||||||||  gen    ")

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Grid = __webpack_require__(3);
const PopupNumbers = __webpack_require__(6);
const grid = new Grid($("#container"));
grid.build();
grid.layout();

const popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);

/**
 * 功能按钮
 */
$("#check").on("click", e => {
    if (grid.check()) {
        alert("恭喜你通过了这次数独游戏！");
    }
});
$("#reset").on("click", e => {
    grid.reset();
});
$("#clear").on("click", e => {
    grid.clear();
});
$("#rebuild").on("click", e => {
    grid.rebuild();
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Toolkit = __webpack_require__(0);
const Sudoku = __webpack_require__(4);
const Generator = __webpack_require__(1);
const Checker = __webpack_require__(5);

class Grid {
    constructor(container) {
        this._$container = container;
    }

    build() {
        // const matrix = Toolkit.matrix.makeMatrix();
        // const gen = new Generator();
        // gen.generator();
        // const matrix = gen.matrix;
        const sudoku = new Sudoku();
        sudoku.make(4);
        const matrix = sudoku.puzzleMatrix;
        // 测试通过代码
        // const matrix = sudoku.solutionMatrix;

        const $cells = matrix.map(rowValues => rowValues.map((cellValue, i) => {
            return $("<span>").addClass(cellValue ? "fixed" : "empty").text(cellValue);
        }));

        const $divArray = $cells.map($spanArray => {
            return $("<div>").addClass("row").append($spanArray);
        });

        this._$container.append($divArray);
    }

    layout() {
        const width = $("span:first", this._$container).width();

        $("span", this._$container).height(width).css({
            "line-height": `${width}px`,
            "font-size": width < 32 ? `${width / 2}px` : "20px"
        });
    }

    bindPopup(popupNumbers) {
        this._$container.on("click", "span", e => {
            const $cell = $(e.target);
            if ($cell.is(".fixed")) return;
            popupNumbers.popup($cell);
        });
    }

    /**
     * 功能按钮实现
     */
    check() {
        // 从界面获取需要检查的数据
        const $rows = this._$container.children();
        const data = $rows.map((rowIndex, div) => {
            return $(div).children().map((colIndex, span) => parseInt($(span).text()) || 0);
        }).toArray().map($data => $data.toArray());

        const checker = new Checker(data);
        if (checker.check()) {
            return true;
        }

        // 检查不成功，进行标记
        const marks = checker.matrixMarks;
        this._$container.children().each((rowIndex, div) => {
            $(div).children().each((colIndex, span) => {
                const $span = $(span);
                if ($span.is(".fixed") || $span.is(".mark1") || $span.is(".mark2") || marks[rowIndex][colIndex]) {
                    $span.removeClass("error");
                } else {
                    $span.addClass("error");
                }
            });
        });
    }

    reset() {
        this._$container.find("span:not(.fixed)").removeClass("error mark1 mark2").addClass("empty").text(0);
    }

    clear() {
        this._$container.find("span.error").removeClass("error");
    }

    rebuild() {
        this._$container.empty();
        this.build();
        this.layout();
    }
}

module.exports = Grid;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// 生成数独游戏
// 1. 生成完成的解决方案： Generator
// 2. 随机去除部分数据： 俺一定比例

const Generator = __webpack_require__(1);

class Sudoku {
    constructor() {
        // 生成完成的解决方案
        const gen = new Generator();
        gen.generator();
        this.solutionMatrix = gen.matrix;
    }

    make(level = 5) {
        // 生成迷盘
        console.log("难度等级：", level);
        this.puzzleMatrix = this.solutionMatrix.map(row => {
            return row.map(cell => Math.random() * 9 < level ? 0 : cell);
        });
    }
}
module.exports = Sudoku;

// const sudo = new Sudoku();
// sudo.make(9);
// console.log(sudo)

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// 检查数独的解决方案

function checkArray(array) {
    const length = array.length;

    const marks = new Array(length);
    marks.fill(true);

    for (let i = 0; i < length - 1; i++) {
        if (!marks[i]) {
            continue;
        }
        const v = array[i];
        // 是否有效， 0 - 无效 ， 1-9 有效
        if (!v) {
            marks[i] = false;
            continue;
        }
        // 是否有重复 
        for (let j = i + 1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }

    return marks;
}

const Toolkit = __webpack_require__(0);

// 输入： matrix， 用户完成的数独数据
// 处理：　对 matrix 的行列宫进行检查
// 输出： 检查是否成功、marks
class Checker {
    constructor(matrix) {
        this._matrix = matrix;
        this._matrixMarks = Toolkit.matrix.makeMatrix(true);
    }

    get matrixMarks() {
        return this._matrixMarks;
    }

    get isSuccess() {
        return this._success;
    }

    check() {
        this.checkRows();
        this.checkCols();
        this.checkBoxes();

        // 检查是否成功
        // Array.prototype.every()
        this._success = this._matrixMarks.every(row => row.every(mark => mark));
        return this._success;
    }

    checkRows() {
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            const rows = this._matrix[rowIndex];
            const marks = checkArray(rows);
            for (let colIndex = 0; colIndex < marks.length; colIndex++) {
                if (!marks[colIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

    checkCols() {
        for (let colIndex = 0; colIndex < 9; colIndex++) {
            const cols = [];
            for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
                cols[rowIndex] = this._matrix[rowIndex][colIndex];
            }

            const marks = checkArray(cols);
            for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
                if (!marks[rowIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

    checkBoxes() {
        for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
            const boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
            const marks = checkArray(boxes);
            for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
                if (!marks[cellIndex]) {
                    const { rowIndex, colIndex } = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex);
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
}

module.exports = Checker;

// const Generator = require("./generator");
// const gen = new Generator();
// gen.generator();
// console.log(gen, "-------------------------------")
// const matrix = gen.matrix;
// const checker = new Checker(matrix);
// console.log("check result", checker.check());
// console.log(checker.matrixMarks);

// matrix[1][1] = 0;
// matrix[2][3] = matrix[3][6] = 6;
// const checker2 = new Checker(matrix);
// console.log("check result2", checker2.check());
// console.log(checker2.matrixMarks)

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// 处理弹出的操作面板

class PopupNumbers {
    constructor($panel) {
        this._$panel = $panel.hide().removeClass("hidden");

        this._$panel.on("click", "span", e => {
            const $span = $(e.target);
            const $cell = this._$targetCell;
            // mark1， mark2 回填样式
            if ($span.hasClass("mark1")) {
                if ($cell.hasClass("mark1")) {
                    $cell.removeClass("mark1");
                } else {
                    $cell.removeClass("mark2").addClass("mark1");
                }
            } else if ($span.hasClass("mark2")) {
                if ($cell.hasClass("mark2")) {
                    $cell.removeClass("mark2");
                } else {
                    $cell.removeClass("mark1").addClass("mark2");
                }
            }
            // empty，取消数字填写，取消 mark
            else if ($span.hasClass("empty")) {
                    $cell.addClass("empty").text(0);
                }
                // 1-9 回填数字
                else {
                        $cell.removeClass("empty").text($span.text());
                    }

            this.hide();
        });
    }
    // 隐藏弹出面板
    hide() {
        this._$panel.hide();
    }
    popup($cell) {
        this._$targetCell = $cell;
        const { left, top } = $cell.offset();
        this._$panel.css({
            left: `${left}px`,
            top: `${top}px`
        }).show();
    }

}

module.exports = PopupNumbers;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map
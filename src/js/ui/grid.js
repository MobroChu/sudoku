const Toolkit = require("../core/toolkit");
const Sudoku = require("../core/sudoku");
const Generator = require("../core/generator");
const Checker = require("../core/checker");

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

        const $cells = matrix.map(rowValues =>
            rowValues.map((cellValue, i) => {
                return $("<span>")
                    .addClass(cellValue ? "fixed" : "empty")
                    .text(cellValue);
            }));

        const $divArray = $cells.map($spanArray => {
            return $("<div>")
                .addClass("row")
                .append($spanArray);
        });

        this._$container.append($divArray);
    }

    layout() {
        const width = $("span:first", this._$container).width();

        $("span", this._$container)
            .height(width)
            .css({
                "line-height": `${width}px`,
                "font-size": width < 32 ? `${width / 2}px` : "20px"
            })
    }

    bindPopup(popupNumbers) {
        this._$container.on("click", "span", e => {
            const $cell = $(e.target);
            if ($cell.is(".fixed")) return;
            popupNumbers.popup($cell);
        })
    }

    /**
     * 功能按钮实现
     */
    check() {
        // 从界面获取需要检查的数据
        const $rows = this._$container.children();
        const data = $rows.map((rowIndex, div) => {
            return $(div).children()
                .map((colIndex, span) => parseInt($(span).text()) || 0)
        })
            .toArray()
            .map($data => $data.toArray());

        const checker = new Checker(data);
        if (checker.check()) {
            return true;
        }

        // 检查不成功，进行标记
        const marks = checker.matrixMarks;
        this._$container.children()
            .each((rowIndex, div) => {
                $(div).children()
                    .each((colIndex, span) => {
                        const $span = $(span);
                        if ($span.is(".fixed")
                            || $span.is(".mark1")
                            || $span.is(".mark2")
                            || marks[rowIndex][colIndex]) {
                            $span.removeClass("error");
                        } else {
                            $span.addClass("error");
                        }

                    })
            })
    }

    reset() {
        this._$container.find("span:not(.fixed)")
            .removeClass("error mark1 mark2")
            .addClass("empty")
            .text(0);
    }

    clear() {
        this._$container.find("span.error")
        .removeClass("error");
    }

    rebuild() {
        this._$container.empty();
        this.build();
        this.layout();
    }
}


module.exports = Grid;

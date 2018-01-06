// 生成数独游戏
// 1. 生成完成的解决方案： Generator
// 2. 随机去除部分数据： 俺一定比例

const Generator = require("./generator")

class Sudoku {
    constructor() {
        // 生成完成的解决方案
        const gen = new Generator();
        gen.generator();
        this.solutionMatrix = gen.matrix;
    }
    
    make(level = 5) {
        // 生成迷盘
        console.log("难度等级：", level)
        this.puzzleMatrix = this.solutionMatrix.map(row => {
            return row.map(cell => Math.random() * 9 < level ? 0 : cell);
        });
    }
}
module.exports = Sudoku;

// const sudo = new Sudoku();
// sudo.make(9);
// console.log(sudo)

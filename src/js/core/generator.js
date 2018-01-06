// 生成数独解决方案的

const Toolkit = require("./toolkit")
class Generator {
    generator() {
        while (!this.interGenerator()) {
            console.warn("When the system builds sudoku, more than once. ")
        }
    }
    interGenerator() {
        this.matrix = Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix()
        .map(row => row.map((v, i) => i))
        .map(row => Toolkit.matrix.shuffle(row));

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



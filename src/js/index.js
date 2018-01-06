const Grid = require('./ui/grid');
const PopupNumbers = require("./ui/popupnumbers");
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
        alert("恭喜你通过了这次数独游戏！")
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

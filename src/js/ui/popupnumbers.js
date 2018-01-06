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
                    $cell.removeClass("mark1")
                } else {
                    $cell.removeClass("mark2")
                        .addClass("mark1");
                }
            } else if ($span.hasClass("mark2")) {
                if ($cell.hasClass("mark2")) {
                    $cell.removeClass("mark2")
                } else {
                    $cell.removeClass("mark1")
                        .addClass("mark2");
                }
            }
            // empty，取消数字填写，取消 mark
            else if ($span.hasClass("empty")) {
                $cell.addClass("empty")
                    .text(0);
            }
            // 1-9 回填数字
            else {
                $cell.removeClass("empty")
                    .text($span.text());
            }

            this.hide();
        })
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
        })
            .show();

    }


}

module.exports = PopupNumbers;
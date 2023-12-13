import createPosition from "./createPosition";
import cursors from "./cursors";

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.indexSelect = {};
    this.onCellClick = this.onCellClick.bind(this);
    this.onCellEnter = this.onCellEnter.bind(this);
    this.onCellLeave = this.onCellLeave.bind(this);
    this.timerId = null;
  }

  init() {
    this.events();
    this.gamePlay.drawUi("prairie");
    this.showCharacter();
  }

  events() {
    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
    this.gamePlay.addCellClickListener(this.onCellClick);
  }

  showCharacter() {
    this.timerId = setInterval(() => {
      const position = createPosition(this.gamePlay.boardSize);
      this.gamePlay.redrawPositions(position);
    }, 1000);
  }

  onCellClick(index) {
    this.gamePlay.setCursor(cursors.crosshair);
    if (document.querySelector(".selected-red")) {
      this.gamePlay.deselectCell(this.indexSelect.red);
    }
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    this.gamePlay.selectCell(index);
    this.indexSelect.red = index;
    this.showCharacter();
  }

  onCellEnter() {
    this.gamePlay.setCursor(cursors.pointer);
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
  }
}

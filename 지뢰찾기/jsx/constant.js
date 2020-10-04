export const DISPATCH_TYPE = {
  START_GAME: 'start_game',
  OPEN_CELL: 'open_cell',
  CLICK_MINE: 'click_mine',
  FLAG_CELL: 'flag_cell',
  QUESTION_CELL: 'question_cell',
  NORMALIZE_CELL: 'normalize_cell',
  INCREMENT_TIMER: 'increment_timer',
};

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, //0이상이면 다 opened
};

import Ember from 'ember';

var GameMap = Ember.Object.extend({
  rows: []
});

var MapRow = Ember.Object.extend({
  cells: []
});
var MapCell = Ember.Object.extend({
  hasBomb: false,
  text: ''
});

var buildMapRows = function(width, height) {
  var rows = [];
  for (var r = 0; r < height; r++) {
    var cells = [];
    for (var c = 0; c < width; c++) {
      var cell = MapCell.create();
      cell.hasBomb = false;
      cells.push(cell);
    }
    var row = MapRow.create({cells: cells});
    rows.push(row);
  }
  setBombs();
  return rows;
};

var setBombs = function() {
  var bombsToSet = 10;
  var numToMul = 10;

  for(let i = 0; i < bombsToSet; i++) {
      let j = Math.floor(Math.random()*numToMul);
      for(let n = 0; n < bombsToSet; i++) {
        let k = Math.floor(Math.random() *numToMul);
        this.set('map.rows.'+j+'.hasBomb', true);
        this.set('map.cells.'+k+'.hasBomb', true);
      }
    }
};

export default Ember.Controller.extend({
  mapWidth: 10,
  mapHeight: 10,
  bombNumber: 10,
  gameOver: false,
  gameLost: false,
  selected: [],
  neighborCount: 0,

  map: Ember.computed('mapWidth', 'mapHeight', function() {
   var w = this.get('mapWidth');
   var h = this.get('mapHeight');
   return GameMap.create({rows: buildMapRows(w, h)});
  }),

  init: function() {
    this.set('name', 'The Hopeful Forest');
  },

  actions: {
    resets: function() {
      this.set('bombNumber', 10);
      buildMapRows();
    },

    select: function() {
      selected.add(this);
      for(let i = 0; i < selected.length(); i++) {
        neighborCount = 0;
        checkGameOver();
        checkForNum();
      }
    },

    checkGameOver: function(){
      if(this.cells.hasBomb) {
        gameOver = true;
        gameLost = true;
      }
    },

    checkForNum: function() {
        if(this.map.rows-1.hasBomb == true) {
          neighborCount++;
        },
        if(this.map.rows+1.hasBomb == true) {
          neighborCount++;
        },
        if(this.map.cells-1.hasBomb == true) {
          neighborCount++;
        },
        if(this.map.cells+1.hasBomb == true) {
          neighborCount++;
        },
        this.class = 'NumCount',
        if(neighborCount == 0) {
          this.class = 'noNum';
          selected.add(this.map.rows-1);
          selected.add(this.map.rows+1);
          selected.add(this.map.cells-1);
          selected.add(this.map.cells+1);
        },
    },

  }
});
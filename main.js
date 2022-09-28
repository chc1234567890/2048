const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const RNUM = 4;
const CNUM = 4;

var rect;
var table;
function rand(l, r) {
    return Math.floor(Math.random() * (r - l + 1)) + l;
}
function solve() {
    for (var i = 0; i < table.length; i++) {
        for (var j = 0, k; j < table[i].length; j++) {
            if (table[i][j] == 0) continue;
            for (k = j + 1; k < table[i].length && table[i][k] == 0; k++);
            if (k < table[i].length && table[i][j] == table[i][k]) {
                table[i][j] <<= 1;
                table[i][k] = 0;
            }
            j = k - 1;
        }
        var v = new Array();
        for (var j = 0; j < table[i].length; j++)if (table[i][j] != 0) v.push(table[i][j]);
        for (var j = 0; j < table[i].length; j++)table[i][j] = (j < v.length ? v[j] : 0);
    }
}
function setRect(i,val){
    rect[i].innerHTML = (val == 0? "" : String(val));
    rect[i].setAttribute("class","r r" + val);
}
function init() {
    rect = new Array(RNUM * CNUM);
    ps = new Array(RNUM * CNUM);
    table = new Array(RNUM);
    for (var i = 0; i < RNUM; i++) table[i] = new Array();
    var vec = new Array();
    for (var i = 0; i < 2; i++) {
        var tmp = rand(0, 15);
        while (vec.indexOf(tmp) != -1) tmp = rand(0, 15);
        vec.push(tmp);
    }
    for (var i = 0; i < RNUM * CNUM; i++) {
        rect[i] = document.getElementById("r" + i);
        var val = (vec.indexOf(i) != -1 ? 2 : 0);
        setRect(i,val);
        table[Math.floor(i / RNUM)].push(val);
    }
    window.onkeydown = function (evt) {
        if (evt.keyCode == LEFT) {
            solve();
        }
        if (evt.keyCode == RIGHT) {
            for (var i = 0; i < table.length; i++)table[i].reverse();
            solve();
            for (var i = 0; i < table.length; i++)table[i].reverse();
        }
        if (evt.keyCode == UP) {
            var t = new Array(table[0].length);
            for (var j = 0; j < table[0].length; j++) {
                t[j] = new Array();
                for (var i = 0; i < table.length; i++) {
                    t[j].push(table[i][j]);
                }
            }
            table = t;
            solve();
            t = new Array(table[0].length);
            for (var j = 0; j < table[0].length; j++) {
                t[j] = new Array();
                for (var i = 0; i < table.length; i++) {
                    t[j].push(table[i][j]);
                }
            }
            table = t;
        }
        if (evt.keyCode == DOWN) {
            var t = new Array(table[0].length);
            for (var j = 0; j < table[0].length; j++) {
                t[j] = new Array();
                for (var i = 0; i < table.length; i++) {
                    t[j].push(table[i][j]);
                }
            }
            table = t;
            for (var i = 0; i < table.length; i++)table[i].reverse();
            solve();
            for (var i = 0; i < table.length; i++)table[i].reverse();
            t = new Array(table[0].length);
            for (var j = 0; j < table[0].length; j++) {
                t[j] = new Array();
                for (var i = 0; i < table.length; i++) {
                    t[j].push(table[i][j]);
                }
            }
            table = t;
        }
        var v = new Array();
        for (var i = 0; i < RNUM; i++)for (var j = 0; j < CNUM; j++)if (table[i][j] == 0) v.push(i * RNUM + j);
        if(v.length > 0){
            var tmp = rand(0, v.length - 1);
            table[Math.floor(v[tmp] / RNUM)][v[tmp] % RNUM] = 2;
            for (var i = 0; i < RNUM * CNUM; i++) {
                setRect(i, table[Math.floor(i / RNUM)][i % RNUM]);
            }
        }
    }
}
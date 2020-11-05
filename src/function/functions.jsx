export function timeRemaining(a){
    var y = Math.floor(a / (3600*24*365));
    var d = Math.floor(a / (3600*24));
    var h = Math.floor(a % (3600*24) / 3600);
    var m = Math.floor(a % 3600 / 60);
    var s = Math.floor(a % 60);

    if(y !== 0){
        return y+'y '+d+'d '+h+'h '+m+'m '+s+'s'
    } else if(d !== 0){
        return d+'d '+h+'h '+m+'m '+s+'s'
    } else if(h !== 0){
        return h+'h '+m+'m '+s+'s'
    } else if(m !== 0){
        return m+'m '+s+'s'
    } else if(s !== 0){
        return s+'s'
    } else {
        return false
    }
}
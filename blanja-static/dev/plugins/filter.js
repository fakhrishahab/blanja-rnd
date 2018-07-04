import Vue from 'vue';

Vue.filter('formatMoney', (value) => {
    const price = parseInt(value);

    if(isNaN(price)){
        return "0";
    }
    let money = (price+"").split("").reverse().join("");
    var str = "";
    
    for(let ii=0; ii < money.length; ii++){
        if(ii*3+3>money.length){
            str += money.substring(ii*3, money.length);
            break;
        }

        str += money.substring(ii*3, ii*3+3)+".";
    }
    if(endsWith(str,".")){
        str = str.substring(0, str.length-1);
    }

    return "Rp "+str.split("").reverse().join("");
});

function endsWith(thisString,str){
    var thisLen=thisString.length;
    var strLen=str.length;
    if(str==null||str==""||thisLen==0||strLen>thisLen){
        return false;
    }
    if(thisString.substring(thisLen-strLen)==str){
        return true;
    }else{
        return false;
    }
    return true;
}
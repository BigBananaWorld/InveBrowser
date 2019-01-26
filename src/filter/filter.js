import Vue from "vue"
// import i18n from "vue-i18n/e"


Vue.filter('fomatTime', function(valueTime) {
    var tempDate = new Date(valueTime)
    valueTime = tempDate.getTime()
    if (valueTime) {
        var newData = Date.parse(new Date());
        var diffTime = Math.abs(newData - valueTime);
        if (diffTime > 7 * 24 * 3600 * 1000) {
            var date = new Date(valueTime);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('1' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            // return m + '-' + d + ' ' + h + ':' + minute;
            return m + '-' + d ;

        } else if (diffTime < 7 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000) {
            // //注释("一周之内");

            // var time = newData - diffTime;
            var dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000));
            // return dayNum + i18n.t('messages.Day');
            return dayNum + "days ago";

        } else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
            // //注释("一天之内");
            // var time = newData - diffTime;
            var dayNum = Math.floor(diffTime / (60 * 60 * 1000));
            return dayNum + "h ago";

        } else if (diffTime < 3600 * 1000 && diffTime > 0) {
            // //注释("一小时之内");
            // var time = newData - diffTime;
            var dayNum = Math.floor(diffTime / (60 * 1000));
            return dayNum + "min ago";

        }
    }
});

Vue.filter('fromToday', function(valueTime) {
    let tempDate = new Date(parseInt(valueTime));
    let today = new Date();
    let days = today.getTime() - tempDate.getTime();
    return parseInt(days/(1000*60*60*24));
});

Vue.filter('parseTime', function(valueTime) {
    let tempDate = new Date(parseInt(valueTime));
    let res = tempDate.getFullYear() + '/' + (tempDate.getMonth()+1) + '/'+ tempDate.getDate() + ' '+ tempDate.getHours()
    +':'+tempDate.getMinutes() + ':' + tempDate.getSeconds();
    return res;
});

//数字加逗号
Vue.filter('parseNumber', function(num) {
        let nStr = num + '';  
        let x = nStr.split('.');  
        let x1 = x[0];  
        let x2 = x.length > 1 ? '.' + x[1] : '';  
        let rgx = /(\d+)(\d{3})/;  
        while (rgx.test(x1)) {  
            x1 = x1.replace(rgx, '$1' + ',' + '$2');  
        }  
        return x1 + x2;  
});
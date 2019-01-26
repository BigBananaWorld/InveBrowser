/**
 * 工具类
 */
export default {
    /**
     * 单数数字前加上 0 
     * @param  {Number} day [description]
     * @return {[type]}     [description]
     */
    getDayForDate: function(day = 1) {
        if (day < 10) {
            return "0" + day
        } else {
            return "" + day
        }
    },

    /**
     * 获取uuid
     */
    getUUID: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
        })
    },

    /**
     * 时间显示规则
     */
    getTimeFromNow: function(datestr) {
        if (datestr) {
            let aa = new Date(Date.parse(datestr.replace(/-/g, "/")))
            let now = new Date()
            let hour = (now.getTime() - aa.getTime()) / (1000 * 60 * 60)
            let showtime = null
            if (hour < 0) {
                return "1分钟前"
            }
            if (hour < 1) {
                showtime = Math.floor(hour * 60)
                return showtime + "分钟前"
            } else if (hour >= 1 && hour <= 23) {
                showtime = Math.floor(hour)
                return showtime + "小时前"
            } else {
                showtime = (datestr.split(" "))[0]
                return showtime
            }
        }
        return null
    },

    /**
     * 替换所有字符
     * @param  {String} targetStr  [目标字符串]
     * @param  {String} replaceStr [被替换的字符]
     * @param  {String} replaceTo  [替换成的字符]
     * @return {String}            [description]
     */
    replaceAll: function(targetStr, replaceStr, replaceTo) {
        let reg = new RegExp(replaceStr, "g")
        return targetStr.replace(reg, replaceTo);
    },

    stringTrim: function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },

    /**
     * 隐藏电话号码
     * @param  {[type]} phone [description]
     * @return {[type]}       [description]
     */
    hidePhone: function(phone) {
        if (phone) {
            if ((/^1[34578]\d{9}$/.test(phone))) {
                return phone.substring(0, 3) + "****" + phone.substring(7)
            } else {
                return phone
            }
        } else {
            return null
        }


    },

    /**
     * 隐藏字符串特殊字符
     * @param  {[type]} phone [description]
     * @return {[type]}       [description]
     */
    hideString: function(str) {
        if (str) {
            return str.replace(/\s+/g, "");
        } else {
            return null
        }

    }




}
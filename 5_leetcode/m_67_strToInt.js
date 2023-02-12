/**
 * 面试题67. 把字符串转换成整数
 * https://leetcode.cn/problems/ba-zi-fu-chuan-zhuan-huan-cheng-zheng-shu-lcof/
 * 2023/1/15
 * 
 */


// 1. bymyself
var strToInt = function(str) {
    if (!str) return 0

    let i = 0;
    // 1. 去掉开头空格呀
    while (str[i] === " ") {
        i++
         // 竟然全是空格
        if (i === str.length) {
            return 0
        }
    }

    // 2. 处理第一个有效字符
    let ans = 0;
    let flag = 1
    if (str[i] === "-") {
        flag = -1
    } else if (str[i] === "+"){
        
    } else if ("0" <= str[i] && str[i] <= "9") {
        ans = str[i] - "0"
    } else {
        // 非法
        return 0
    }
    i++

    // 3. 后续应该是正常数字了
    while (i < str.length) {
        if ("0" <= str[i] && str[i] <= "9") {
            ans = ans * 10 + (str[i] - "0")
            // 最小值，最大值判断
            if (flag === -1 && ans > 2147483648) return -2147483648
            if (flag === 1 && ans > 2147483647) return 2147483647
        } else {
            break
        }
        i++
    }

    return flag * ans;
};


// 2. 官方题解，杀鸡用牛刀
/**
 * @param {string} str
 * @return {number}
 */
var strToInt = function(str) {
    let auto = new Automation()
    for (let c of str) {
        auto.get(c)
    }
    return auto.signed * auto.ans
};

// 了解新玩法，还能用状态机？杀鸡用牛刀？
function Automation() {
    this.state = "start"
    this.ans = 0
    this.signed = 1
    this.table = {
        'start': ['start', 'signed', 'in_number', 'end'],
        'signed': ['end', 'end', 'in_number', 'end'],
        'in_number': ['end', 'end', 'in_number', 'end'],
        'end': ['end', 'end', 'end', 'end'],
    }
}

Automation.prototype.get = function(c) {
    let type = getCharType(c)
    this.state = this.table[this.state][type]
    if (this.state === 'signed' && c === "-") {
        this.signed = -1
    } else if (this.state === "in_number") {
        this.ans = 10 * this.ans + (c - '0')

        if (this.signed === 1 && this.ans > 2147483647) {
            this.ans = 2147483647
        } else if (this.signed === -1 && this.ans > 2147483648){
            this.ans = 2147483648
        }
    }
}

function getCharType(c) {
    if (c === " ") return 0;
    if (c === "+" || c === "-") return 1;
    if ("0" <= c && c <= "9") return 2;
    return 3
}



console.log(strToInt("42"));
console.log(strToInt("   -42"));
console.log(strToInt("4193 with words"));
console.log(strToInt("words and 987"));
console.log(strToInt("-91283472332"));


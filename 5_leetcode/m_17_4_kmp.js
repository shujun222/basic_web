/**
 * KMP算法
 * 这思想和代码简直了，惊为天人。。。
 * https://www.bilibili.com/video/BV1AY4y157yL/
 * 
 * ABAABABABCA
 * ABABC
 * next数组只针对子字符串就可：
 * 
 * ABABC
 * 00120
 * 
 * ABACABAB
 * 001012
 * 
 * 2023/2/11
 */
function search(str, sub) {
    let next = buildNext(sub)
    console.log("next", next);

    let i = 0 // 主子字符串指针，绝对不好退
    let j = 0 // 子字符串
    while (i < str.length) {
        if (str[i] === sub[j]) {
            i++
            j++
        } else if (j === 0) {
            i++
        } else {
            j = next[j - 1]
        }

        if (j === sub.length) return i - j;
    }

    return -1
}

function buildNext(sub) {
    let next = [0];
    let i = 1;
    let pre_length = 0; // 已经匹配了多少相同前缀
    while (i < sub.length) {
        if (sub[pre_length] === sub[i]) {
            i++
            pre_length++
            next.push(pre_length)
        } else if (pre_length == 0) {
            next.push(0)
            i++
        } else {
            pre_length = next[pre_length - 1]
        }
    }
    return next;
}


// console.log(search("ABAABABABCA", "ABABC") === 5);
// console.log(search("GTTATAGCTGGTAGCGGCGAA", "GTAGCGGCG") === 10);
// console.log(search("abcdefgh", "cdef"));
// console.log(search("abgh", "gh"));
// console.log(search("abgh", "ab"));
// console.log(search("abgh", "gha"));

// 本例中坏字符其实是str中的，所以一直是"a", 效率和bf算法是一样的
console.log(search("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab", "aaaaaaaaaaaaaaab") === 16);
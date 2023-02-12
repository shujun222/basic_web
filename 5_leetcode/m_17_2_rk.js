/**
 * 利用hashcode跳过很多没必要的比较
 * 2023/2/5  
 */
function search(str, sub) {
    function getNextHash(strHash, i) {
        strHash -= str[i].charCodeAt()
        strHash += str[i + subLen].charCodeAt()
        return strHash
    }

    let subHash = getHashCode(sub)
    let subLen = sub.length
    let strHash = getHashCode(str.substr(0, subLen))
    for (let i = 0; i < str.length - subLen + 1; i++) {
        if (i > 0) {
            strHash = getNextHash(strHash, i - 1)
        }
        if (subHash === strHash && sub === str.substr(i, subLen)) {
            return i;
        }
    }

    return -1
}

function getHashCode(str) {
    let value = 0;
    for (let c of str) {
        value += c.charCodeAt()
    }
    return value;
}



console.log(search("abcdefgh", "cdef"));
console.log(search("abgh", "gh"));
console.log(search("abgh", "ab"));
console.log(search("abgh", "gha"));
console.log(search("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab", "aaaaaaaaaaaaaaab"));
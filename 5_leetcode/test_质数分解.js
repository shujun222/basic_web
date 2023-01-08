function resolve(n) {
    let ans = []
    for (let i = 2; i <= n; i++) {
        while (n % i === 0) {
            ans.push(i)
            n /= i
        }
    }
    return ans;
}

console.log(resolve(100));
console.log(resolve(26));
console.log(resolve(17));
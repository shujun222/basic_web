arr = [{name: 'sj', age: 33}, {name: 'lanbao', age: 30}]

// age = arr.map(o => o.age > 30 && o.age)
age = arr.map(o => {
    if (o.age > 30) {
        return o.age
    } 
})
console.log(age);


a = [1, 2, 3]
console.log(a.join(", "));
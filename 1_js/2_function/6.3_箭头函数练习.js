this.name = "韩立"
let a = 0
let palyer = {
    name: "厉飞雨",
    run1: () => { 
        console.log("run1 this", this)
        console.log("run1 this.name", this.name);
        console.log("run1 a", a);
    },

    run2: function() {
        console.log("run2 this", this)
        console.log("run2 this.name", this.name);
        let a = 2
        this.run1()
    }
}

palyer.run1()
palyer.run2()


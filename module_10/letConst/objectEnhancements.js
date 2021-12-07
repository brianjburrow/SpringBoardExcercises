createInstructor = (firstName, lastName) => {
    return { firstName, lastName }
}

let favoriteNumber = 42;
let instructor = {
    firstName: "Colt",
    [favoriteNumber]: "That is my Favorite!"
}

var instructor = {
    firstName: "Colt",
    sayHi: function () {
        return "Hi!";
    },
    sayBye: function () {
        return this.firstName + " says bye!";
    }
}

const instructor = {
    firstName: "Colt",
    sayHi() { return "Hi!" },
    sayBye() { return this.firstName + " says bye!" }
}

createAnimal = (species, verb, noise) => {
    return {
        species, noise, [verb]() { console.log(this.noise) }

    }
}
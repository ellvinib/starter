class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Helloqsd,qsdqd" + this.greeting;
    }
}

var greeter1 = new Greeter("world");

var button = document.createElement('button');
button.textContent = "Say Hello eop";
button.onclick = function() {
    alert(greeter1.greet());
}

document.body.appendChild(button);
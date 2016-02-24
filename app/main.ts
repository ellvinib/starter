class Greeter1 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

var greeter = new Greeter1("world e");

var button = document.createElement('button');
button.textContent = "Say Hello no";
button.onclick = function() {
    alert(greeter.greet());
}

document.body.appendChild(button);
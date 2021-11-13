# typewriter

Typewritter Effect
Accepts an element which supports innerHTML method, (no need for any style) with an id.\n
const TypeWriter = require("TypeWriter.js");\n	
const typewriter = new TypeWriter(document.getElementById("message-container"));\n

Methods
typewriter.write(); or await typewriter.write();
typewriter.clear(); or await typewriter.clear();
typewriter.resetAll(); ////Stop the execution immediately. Clear all the timers.
typewriter.setData(); //Set the displayed message

***Caret will dissapeared after time*2 seconds.
***Caret size affects the line-height. It is recommended to use values larger that "1" only in a sinle line text.

Usage

npm i type-writer

TypeWriter constructor 
new TypeWriter(el, time=4000, font="Verdana", fontSize="1em", textColor="hsla(240,100%,0%,100%)", caretColor="hsla(240,100%,0%,100%)", caretSize=1, deleteInterval=15);

const container = document.getElementById("message-container");
const typewriter = new TypeWriter(container);
typewriter.setData("Hello World!");
typewriter.write();

OR in async mode
write();

async function write(){
	const container = document.getElementById("message-container");
	const typewriter = new TypeWriter(container);
	typewriter.setData("Hello World!");
	await typewriter.write();
	typewriter.setData("How are you today?");
	await typewriter.write();
	await typewriter.clear();
}

Or you can include TypeWriter as a script. See example.





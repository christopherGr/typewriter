# typewriter

Typewritter Effect
Accepts an element which supports innerHTML method, (no need for any style) with an id.<br>
const TypeWriter = require("TypeWriter.js");<br>	
const typewriter = new TypeWriter(document.getElementById("message-container"));<br>

Methods<br>
typewriter.write(); or await typewriter.write();<br>
typewriter.clear(); or await typewriter.clear();<br>
typewriter.resetAll(); ////Stop the execution immediately. Clear all the timers.<br>
typewriter.setData(); //Set the displayed message<br><br>

***Caret will dissapeared after time*2 seconds.<br>
***Caret size affects the line-height. It is recommended to use values larger that "1" only in a sinle line text.<br><br>

Usage<br>

npm i type-writer<br>

TypeWriter constructor <br>
new TypeWriter(el, time=4000, font="Verdana", fontSize="1em", textColor="hsla(240,100%,0%,100%)", caretColor="hsla(240,100%,0%,100%)", caretSize=1, deleteInterval=15);<br><br>

const container = document.getElementById("message-container");<br>
const typewriter = new TypeWriter(container);<br>
typewriter.setData("Hello World!");<br>
typewriter.write();<br><br>

OR in async mode<br>
write();<br><br>

async function write(){<br>
	const container = document.getElementById("message-container");<br>
	const typewriter = new TypeWriter(container);<br>
	typewriter.setData("Hello World!");<br>
	await typewriter.write();<br>
	typewriter.setData("How are you today?");<br>
	await typewriter.write();<br>
	await typewriter.clear();<br>
}<br><br>

Or you can include TypeWriter as a script. See example.





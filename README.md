Typewritter Effect<br>
Accepts an element which supports innerHTML method, (no need for any style) with an id.<br>
const TypeWriter = require("e-typewriter.js");<br>	
const typewriter = new TypeWriter(document.getElementById("message-container"));<br><br>

Methods<br>
typewriter.write(); or await typewriter.write();<br>
typewriter.clear(); or await typewriter.clear();<br>
typewriter.resetAll(); ////Stop the execution immediately. Clear all the timers.<br>
typewriter.setData(); //Set the displayed message<br><br>

TypeWriter constructor <br>
new TypeWriter(el, time=4000, font="Verdana", fontSize="1em", textColor="hsla(240,100%,0%,100%)", caretColor="hsla(240,100%,0%,100%)", caretSize=1, deleteInterval=15);<br><br>

Arguments<br>
An element from the document which supports innerHTML method and has an id, to display the message. (required)<br>
The total time in ms, that the effect will be complete. (optional)<br>
Font-family. (optional)<br>
Font-size (px, em, rem, %, vw, calc(vw+vh)). All units are accepted. (optional)<br>
Text color. ("black", hex color, hsla, rgba). All values are accepted. (optional)<br>
Caret color. ("black", hex color, hsla, rgba). All values are accepted. (optional)<br>
Caret size. Default size is 1. Accepts a number. For example 2, 1.3.. (optional)<br>
Interval time for deleting effect. (optional)<br>

***Caret will dissapeared after time*2 seconds.<br>
***Caret size affects the line-height. It is recommended to use values larger that "1" only in a sinle line text.<br><br>

Usage<br>

npm i type-writer<br>

const container = document.getElementById("message-container");<br>
const typewriter = new TypeWriter(container);<br>
typewriter.setData("Hello World!");<br>
typewriter.write();<br><br>

OR in async mode<br>
write();<br>

async function write(){<br>
	&nbsp;const container = document.getElementById("message-container");<br>
	&nbsp;const typewriter = new TypeWriter(container);<br>
	&nbsp;typewriter.setData("Hello World!");<br>
	&nbsp;await typewriter.write();<br>
	&nbsp;typewriter.setData("How are you today?");<br>
	&nbsp;await typewriter.write();<br>
	&nbsp;await typewriter.clear();<br>
}<br><br>

Or you can include TypeWriter as a script. See example.





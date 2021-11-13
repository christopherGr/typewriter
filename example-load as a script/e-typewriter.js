/*
Typewritter-effect
Accepts an element which supports innerHTML method, (no need for any style) with an id.
const TypeWriter = require("TypeWriter.js");	
const typewriter = new TypeWriter(document.getElementById("message-container"));

Methods
typewriter.write(); or await typewriter.write();
typewriter.clear(); or await typewriter.clear();
typewriter.resetAll(); ////Stop the execution immediately. Clear all the timers.
typewriter.setData(); //Set the displayed message

***Caret will dissapeared after time*2 seconds.
***Caret size affects the line-height. It is recommended to use values larger that "1" only in a sinle line text.
*/

class TypeWriter{
	constructor(el, time=4000, font="Verdana", fontSize="1em", textColor="hsla(240,100%,0%,100%)", caretColor="hsla(240,100%,0%,100%)", caretSize=1, deleteInterval=15){
		this.el = el;
		this.time = time;
		this.el.style.fontFamily = font;
		this.el.style.fontSize = fontSize;
		this.el.style.color = textColor;
		this.caretColor = caretColor;	
		this.caretSize = caretSize;	
		this.deleteInterval = deleteInterval;		
		this.el.style.lineHeight = caretSize*1.6;
		this.el.style.width = "100%";
		this.el.style.height = "100%";
		this.el.style.padding= "3%";
		this.el.style.overflowY = "auto";
		this.el.style.overflowX = "hidden";	
		this.el.style.pointerEvents = "auto";	
		this.el.style.userSelect = "none";				
		this.initCaret();	
		this.initSrollbar();	
		this.timer = null;	
		this.clearTimer = null;			
		this.caretTimer = null;	
	}
	
	///Initialize typewriter effect
	write(){
		const that = this;
		return new Promise(function(resolve,reject){			
			that.resetAll();
			that.compare().then(function(data){ resolve(that.appendLetter(data)); });	
		});
	}
	
	///Write Letter by letter
	appendLetter(data){
		const that = this;
		return new Promise(function(resolve,reject){			
			var index = 0;
			if(that.el.innerHTML == that.data) return resolve(that.onCompleteTyping());			
			that.timer = setInterval(function(){
				if(that.el.innerHTML == that.data) return resolve(that.onCompleteTyping());
				that.el.innerHTML += data.charAt(index++);
				that.el.scrollTop = that.el.scrollHeight;
			},that.intervalTime)
		});	
	}
	
	///If the message is already typed, returns empty string.
	///If the message is semi-typed, returns the remained text.
	///If this is a brand new message, delete the old one (if exists) and returns the complete message.
	async compare(){
		if(this.data == this.el.innerHTML) return "";
		if(this.data.split(this.el.innerHTML).length==2 && this.data.split(this.el.innerHTML)[1]) return this.data.split(this.el.innerHTML)[1];
		await this.clear();
		return this.data;
	}
	
	///Delete all the content in an typewriter effect
	clear(){
		const that = this;
		return new Promise(function(resolve,reject){
			that.clearTimer = setInterval(function(){
				if(that.el.innerHTML=="") { clearInterval(that.clearTimer); return resolve(true); }
				that.el.innerHTML = that.el.innerHTML.slice(0, that.el.innerHTML.length-1);
			},that.deleteInterval);
		});
	}		
	
	///Update message.
	setData(data){
		this.data = data;
		this.intervalTime = this.time/this.data.length;	
	}
	
	///Runs when typing has been completed. Removes interval-timer and hide the caret after 4 seconds.
	onCompleteTyping(){
		const that = this;
		clearInterval(this.timer);
		this.timer = null;
		return new Promise(function(resolve,reject){			
			that.caretTimer = setTimeout(function(){
				clearTimeout(that.caretTimer);
				that.setVisibility(document.getElementsByClassName("typewriter-caret")[0], false);	
				return resolve(true); 	
			},that.time);
		});		
	}	

	///Set the visibility of caret by changing the innerHTML of the target <style> element
	setVisibility(el, bool){
		const value = bool ? "visible" : "hidden";	
		const regex = new RegExp("visibility:" + (bool?"hidden":"visible") + ";", "g");
		return el.innerHTML = el.innerHTML.replace(regex, "visibility:"+value+";");		
	}	

	///Stop writing and deleting 
	resetAll(){
		clearInterval(this.timer); 
		clearInterval(this.clearTimer); 
		clearInterval(this.caretTimer); 	
		this.timer = null;		
		this.clearTimer = null; 
		this.caretTimer = null; 
		this.setVisibility(document.getElementsByClassName("typewriter-caret")[0], true);	
	}
	
	///Create a Caret that is blinking by add stylesheet in the document head
	initCaret(){
		if(!this.el.id) return console.log("Container element hasn't #id");			
		const style = document.createElement("style");
		style.type = 'text/css';
		style.className = "typewriter-caret";
		const content = "{ content:' '; border-radius:1px; border-right:0.6em solid "+this.caretColor+"; font-size:"+this.caretSize+"em; animation: blink 1s infinite; visibility:visible; }";
		style.innerHTML = "#"+this.el.id+"::after" +content;
		document.head.appendChild(style);
		
		const keyframeRule = document.createElement("style");
		keyframeRule.type = 'text/css';
		keyframeRule.className = "typewriter-blink";
		keyframeRule.innerHTML = "@keyframes blink{50% {border-color: transparent;}}";
		document.head.appendChild(keyframeRule);
	}

	///Create a scrollbar for the element, by add stylesheet in the document head
	initSrollbar(){		
		if(!this.el.id) return console.log("Container element hasn't #id");		
		const style = document.createElement("style");
		style.type = 'text/css';
		document.head.appendChild(style);
		const sheet = document.head.appendChild(style).sheet;
		var cssRules = "{width: 0.7em;}";		
		sheet.insertRule("#"+this.el.id+"::-webkit-scrollbar" +cssRules);		
		const elementBackgrColor = this.el.style.backgroundColor ? this.el.style.backgroundColor : "white";		
		cssRules = "{background:"+this.el.style.color+"; border-right:0.1em solid "+elementBackgrColor+"; border-radius: 20px;}";
		sheet.insertRule("#"+this.el.id+"::-webkit-scrollbar-thumb" +cssRules);	
		sheet.insertRule("#"+this.el.id+"::-webkit-scrollbar-track{ margin-block: 0.7em; }");
	}
}

//module.exports = TypeWriter;
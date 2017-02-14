/*
 * A button to load a level
 */

/* global shooter, game, createjs */

class Button extends createjs.Container {

    constructor (callback, context, text, position) {
        super();
        this.position = position;
        this.bg       = new createjs.Shape();
        this.txt      = new createjs.Text(text, "20px Verdana", "#000");
        this.callback = callback;
        this.context  = context;

        this.bg.graphics.s("#000").f("#AAA").dr(0,0,this.txt.getMeasuredWidth()+10,26);
        this.txt.set({
            x:5, y:0
        });
        this.addChild(this.bg);
        this.addChild(this.txt);

        this.on("click", this.callback, this.context);
        this.x = this.position.e(1);
        this.y = this.position.e(2);
        this.cache(-2,-2,this.txt.getMeasuredWidth()+14,30);
    }

}

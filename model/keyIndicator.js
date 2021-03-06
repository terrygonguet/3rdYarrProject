/*
 * Indicator if the selected key is pressed or not
 */
class KeyIndicator extends createjs.Text {

    constructor (key) {
        super(key, "20px Montserrat", "red");
        this.key = key;
        // this.on("tick", this.update, this);
        this.on("frameTick", this.update, this);
    }

    update (e) {
        this.color = (input.keys[this.key] ? "darkgreen" : "red");
    }
}

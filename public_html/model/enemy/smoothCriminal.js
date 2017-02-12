/* 
 * Enemy with smooth movements
 */

/* global shooter, game, createjs, Vector */

/*
 * position : 2D Vector starting position
 * radius: duh
 * color [temp] : html color
 * health: number
 */
class SmoothCriminal extends Enemy {
    
    constructor (position, radius, color, health, pointValue = 100) {
        super(position, radius, color, health, pointValue);
        this.path = [position];
        this.segments = [];
        this.step = 0;
        this.points = 75;
    }
    
    getLastTangent () {
        var line = null;
        var last = this.segments[this.segments.length - 1];
        if (last) {
            line = last.endTangent;
        }
        return line;
    }
    
    addPoint (to, speed) {
        this.segments.push(new Segment(this.getLastTangent(), this.path[this.path.length - 1], to, speed));
        this.path.push(to);
    }
    
    update (e) {
        this.position = this.segments[this.step].getPos(e.delta);
        if (this.segments[this.step].isDone()) this.step++;
        if (this.step >= this.segments.length) this.die(false);
        super.update(e);
    }
    
    getTotalTime () {
        var total = 0;
        for (var i of this.segments) {
            total += i.totalTime;
        }
        return total;
    }
    
    die(playerKilled) {
        super.die(playerKilled)
        if (playerKilled) {
            shooter.score += this.points;
            if (Math.random() < 0.5) game.addChild(new Drop("points", this.points, this.position));
            else game.addChild(new Drop("upgrade", Number((Math.random() / 2).toFixed(2)), this.position));
        }
    }
    
}

class Segment {
    
    constructor (tangent, from, to, speed) {
        this.tangent  = tangent;
        this.from     = from;
        this.to       = to;
        this.speed    = speed;
        this.line     = $L(this.from, this.to.subtract(this.from));
        this.time     = 0;
        this.totalTime= 0;
        this.distance = 0;
        this.callback = null;
        this.endTangent= null;
        
        if (this.tangent) {
            this.type = (this.line.isParallelTo(this.tangent) ? "straight" : "curved");
        } else {
            this.type = "straight";
        }
        
        switch (this.type) {
            case "straight" :
                this.distance = this.to.distanceFrom(this.from);
                this.totalTime = this.distance / this.speed * 1000;
                this.endTangent = this.line;
                this.callback = function () {
                    var move = this.to.subtract(this.from).toUnitVector();
                    return this.from.add(move.x(this.distance * (this.time / this.totalTime).clamp(0,1)));
                };
                break;
                
            case "curved" :
                var radiusLine = this.tangent.rotate(Math.PI / 2, this.from);
                var middleLine = this.line.rotate(Math.PI / 2, this.from);
                middleLine.anchor = this.from.add(this.to.subtract(this.from).x(0.5)).to3D();
                var center = radiusLine.intersectionWith(middleLine);
                var radius = this.from.to3D().distanceFrom(center);
                var centerTo = this.to.to3D().subtract(center), 
                    centerFrom = this.from.to3D().subtract(center);
                //var angle = centerTo.angleFrom(centerFrom);
                var angle = 2 * middleLine.direction.angleFrom(radiusLine.direction);
                var clockwise = radiusLine.direction.angleFrom(centerFrom) > 1 ? 1 : -1;
                this.distance = angle * radius;
                this.totalTime = this.distance / this.speed * 1000;
                this.endTangent = $L(this.to.to3D(), centerTo.rotate(clockwise * Math.PI / 2, Line.Z));
                this.callback = function () {
                    return this.from.to3D().rotate(clockwise * angle * (this.time / this.totalTime).clamp(0,1), $L(center, $V([0,0,1])));
                };
                break;
        }
        
    }
    
    getPos (delta) {
        this.time += delta;
        var pos = this.callback.call(this);
        return $V([pos.e(1), pos.e(2)]);
    }
    
    isDone () {
        return (this.time >= this.totalTime)
    }
    
}
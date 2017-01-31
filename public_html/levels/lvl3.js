/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

for (var i = 0; i < 50; i++) {
    var crim = new SmoothCriminal($V([0,0]), 10, "#5C5", 1);
    crim.addPoint($V([5,10]), 200);
    crim.addPoint($V([595,10]), 200);
    crim.addPoint($V([600,0]), 200);
    shooter.addEncounter(crim, 500 + i * 300);
}

for (var i = 0; i < 50; i++) {
    var crim = new SmoothCriminal($V([-1,199]), 10, "#55C", 1);
    crim.addPoint($V([0,200]), 200);
    crim.addPoint($V([200,200]), 200);
    crim.addPoint($V([400,200]), 200);
    crim.addPoint($V([600,200]), 200);
    shooter.addEncounter(crim, 500 + i * 300);
}
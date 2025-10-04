var CircumferencePoint = require("./CircumferencePoint");
var FromPercent = require("../../math/FromPercent");
var Vector2 = require("../../math/Vector2");

/**
 * Returns a Vector2 object containing the coordinates of a point on the circumference of the Circle
 * based on the given angle normalized to the range 0 to 1. I.e. a value of 0.5 will give the point
 * at 180 degrees around the circle.
 *
 * @function Phaser.Geom.CircleSection.GetPoint
 * @since 4.0.0
 *
 * @generic {Phaser.Math.Vector2} O - [out,$return]
 *
 * @param {Phaser.Geom.CircleSection} circle - The CircleSection to get the circumference point on.
 * @param {number} position - A value between 0 and 1, where 0 equals 0 degrees, 0.5 equals 180 degrees and 1 equals 360 around the circle.
 * @param {Phaser.Math.Vector2} [out] - A Vector2 instance to store the return values in. If not given a new Vector2 object will be created.
 *
 * @return {Phaser.Math.Vector2} A Vector2 containing the coordinates of the point around the circle.
 */
var GetPoint = function (circleSection, position, out) {
    if (out === undefined) {
        out = new Vector2();
    }

    var angle = FromPercent(position, 0, circleSection.arcAngle);

    return CircumferencePoint(circleSection, angle, out);
};

module.exports = GetPoint;

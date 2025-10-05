var Vector2 = require("../../math/Vector2");

/**
 * Returns a Vector2 object containing the coordinates of a point on the circumference of the Circle based on the given angle.
 *
 * @function Phaser.Geom.CircleSection.CircumferencePoint
 * @since 4.0.0
 *
 * @generic {Phaser.Math.Vector2} O - [out,$return]
 *
 * @param {Phaser.Geom.CircleSection} circleSection - The CircleSection to get the circumference point on.
 * @param {number} angle - The angle from the center of the CircleSection to the circumference to return the point from. Given in radians.
 * @param {Phaser.Math.Vector2} [out] - A Vector2 to store the results in. If not given a Point will be created.
 *
 * @return {Phaser.Math.Vector2} A Vector2 object where the `x` and `y` properties are the point on the circumference.
 */
var CircumferencePoint = function (circleSection, angle, out) {
    if (out === undefined) {
        out = new Vector2();
    }

    out.x =
        circleSection.x +
        circleSection.radius * Math.cos(angle + circleSection.startAngle);
    out.y =
        circleSection.y +
        circleSection.radius * Math.sin(angle + circleSection.startAngle);

    return out;
};

module.exports = CircumferencePoint;

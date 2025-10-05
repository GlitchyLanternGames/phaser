var Vector2 = require("../../math/Vector2");

/**
 * Returns a uniformly distributed random point from anywhere within the given CircleSection.
 *
 * @function Phaser.Geom.CircleSection.Random
 * @since 4.0.0
 *
 * @generic {Phaser.Math.Vector2} O - [out,$return]
 *
 * @param {Phaser.Geom.CircleSection} circleSection - The CircleSection to get a random point from.
 * @param {Phaser.Math.Vector2} [out] - A Vector2 object to set the random `x` and `y` values in.
 *
 * @return {Phaser.Math.Vector2} A Vector2 object with the random values set in the `x` and `y` properties.
 */
var Random = function (circleSection, out) {
    if (out === undefined) {
        out = new Vector2();
    }

    var t =
        circleSection.startAngle +
        (circleSection.endAngle - circleSection.startAngle) * Math.random();
    var u = Math.random() + Math.random();
    var r = u > 1 ? 2 - u : u;
    var x = r * Math.cos(t);
    var y = r * Math.sin(t);

    out.x = circleSection.x + x * circleSection.radius;
    out.y = circleSection.y + y * circleSection.radius;

    return out;
};

module.exports = Random;

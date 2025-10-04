var Rectangle = require("../rectangle/Rectangle");

/**
 * Returns the bounds of the CircleSection object.
 *
 * @function Phaser.Geom.CircleSection.GetBounds
 * @since 4.0.0
 *
 * @generic {Phaser.Geom.Rectangle} O - [out,$return]
 *
 * @param {Phaser.Geom.CircleSection} circleSection - The CircleSection to get the bounds from.
 * @param {(Phaser.Geom.Rectangle|object)} [out] - A Rectangle, or rectangle-like object, to store the circle bounds in. If not given a new Rectangle will be created.
 *
 * @return {(Phaser.Geom.Rectangle|object)} The Rectangle object containing the Circles bounds.
 */
var GetBounds = function (circleSection, out) {
    if (out === undefined) {
        out = new Rectangle();
    }

    out.x = circleSection.left;
    out.y = circleSection.top;
    out.width = circleSection.width;
    out.height = circleSection.height;

    return out;
};

module.exports = GetBounds;

var Contains = require("./Contains");

/**
 * Check to see if the CircleSection contains all four points of the given Rectangle object.
 *
 * @function Phaser.Geom.CircleSection.ContainsRect
 * @since 4.0.0
 *
 * @param {Phaser.Geom.CircleSection} circleSection - The CircleSection to check.
 * @param {(Phaser.Geom.Rectangle|object)} rect - The Rectangle object to check if it's within the CircleSection or not.
 *
 * @return {boolean} True if all of the Rectangle coordinates are within the circle, otherwise false.
 */
var ContainsRect = function (circleSection, rect) {
    return (
        Contains(circleSection, rect.x, rect.y) &&
        Contains(circleSection, rect.right, rect.y) &&
        Contains(circleSection, rect.x, rect.bottom) &&
        Contains(circleSection, rect.right, rect.bottom)
    );
};

module.exports = ContainsRect;

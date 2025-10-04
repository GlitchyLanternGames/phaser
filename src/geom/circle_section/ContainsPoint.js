var Contains = require("./Contains");

/**
 * Check to see if the CircleSection contains the given x and y coordinates as stored in the Vector2.
 *
 * @function Phaser.Geom.CircleSection.ContainsPoint
 * @since 4.0.0
 *
 * @param {Phaser.Geom.CircleSection} circleSection - The CircleSection to check.
 * @param {Phaser.Math.Vector2} vec - The Vector2 object to check if its coordinates are within the CircleSection or not.
 *
 * @return {boolean} True if the Vector2 coordinates are within the circle, otherwise false.
 */
var ContainsPoint = function (circleSection, vec) {
    return Contains(circleSection, vec.x, vec.y);
};

module.exports = ContainsPoint;

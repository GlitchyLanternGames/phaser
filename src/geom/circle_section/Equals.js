/**
 * Compares the `x`, `y` and `radius` properties of the two given Circles.
 * Returns `true` if they all match, otherwise returns `false`.
 *
 * @function Phaser.Geom.CircleSection.Equals
 * @since 4.0.0
 *
 * @param {Phaser.Geom.CircleSection} circleSection - The first CircleSection to compare.
 * @param {Phaser.Geom.CircleSection} toCompare - The second CircleSection to compare.
 *
 * @return {boolean} `true` if the two Circles equal each other, otherwise `false`.
 */
var Equals = function (circleSection, toCompare) {
    return (
        circleSection.x === toCompare.x &&
        circleSection.y === toCompare.y &&
        circleSection.radius === toCompare.radius &&
        circleSection.arcAngle === toCompare.arcAngle
    );
};

module.exports = Equals;

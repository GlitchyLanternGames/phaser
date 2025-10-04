/**
 * Returns the circumference of the given Circle.
 *
 * @function Phaser.Geom.CircleSection.Circumference
 * @since 3.0.0
 *
 * @param {Phaser.Geom.CircleSection} circleSection - The CircleSection to get the circumference of.
 *
 * @return {number} The circumference of the CircleSection.
 */
var Circumference = function (circleSection) {
    return circleSection.arcAngle * circleSection.radius;
};

module.exports = Circumference;

/**
 * Calculates the area of the circle.
 *
 * @function Phaser.Geom.CircleSection.Area
 * @since 4.0.0
 *
 * @param {Phaser.Geom.CircleSection} circleSection - The Circle to get the area of.
 *
 * @return {number} The area of the Circle.
 */
var Area = function (circleSection) {
    return circleSection.radius > 0
        ? (1 / Math.PI) *
              circleSection.arcAngle *
              circleSection.radius *
              circleSection.radius
        : 0;
};

module.exports = Area;

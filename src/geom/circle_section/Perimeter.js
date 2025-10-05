/**
 * Returns the perimeter of the given CircleSection.
 *
 * @function Phaser.Geom.CircleSection.Perimeter
 * @since 4.0.0
 *
 * @param {Phaser.Geom.CircleSection} circleSection - The CircleSection to get the perimeter of.
 *
 * @return {number} The perimeter of the CircleSection.
 */
var Perimeter = function (circleSection) {
    return (
        circleSection.radius *
        (2 + circleSection.endAngle - circleSection.startAngle) // circleSection.radius * 2 + arc length
    );
};

module.exports = Perimeter;

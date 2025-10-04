/**
 * Offsets the CircleSection by the values given.
 *
 * @function Phaser.Geom.CircleSection.Offset
 * @since 3.0.0
 *
 * @generic {Phaser.Geom.CircleSection} O - [circleSection,$return]
 *
 * @param {Phaser.Geom.CircleSection} circleSection - The CircleSection to be offset (translated.)
 * @param {number} x - The amount to horizontally offset the CircleSection by.
 * @param {number} y - The amount to vertically offset the CircleSection by.
 *
 * @return {Phaser.Geom.CircleSection} The CircleSection that was offset.
 */
var Offset = function (circleSection, x, y) {
    circleSection.x += x;
    circleSection.y += y;

    return circleSection;
};

module.exports = Offset;

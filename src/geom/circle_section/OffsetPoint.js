/**
 * Offsets the CircleSection by the values given in the `x` and `y` properties of the Vector2 object.
 *
 * @function Phaser.Geom.CircleSection.OffsetPoint
 * @since 3.0.0
 *
 * @generic {Phaser.Geom.CircleSection} O - [circleSection,$return]
 *
 * @param {Phaser.Geom.CircleSection} circleSection - The CircleSection to be offset (translated.)
 * @param {Phaser.Math.Vector2} vec - The Vector2 object containing the values to offset the CircleSection by.
 *
 * @return {Phaser.Geom.CircleSection} The CircleSection that was offset.
 */
var OffsetPoint = function (circleSection, vec) {
    circleSection.x += vec.x;
    circleSection.y += vec.y;

    return circleSection;
};

module.exports = OffsetPoint;

/**
 * Copies the `x`, `y` and `radius` properties from the `source` Circle
 * into the given `dest` Circle, then returns the `dest` Circle.
 *
 * @function Phaser.Geom.CircleSection.CopyFrom
 * @since 4.0.0
 *
 * @generic {Phaser.Geom.CircleSection} O - [dest,$return]
 *
 * @param {Phaser.Geom.CircleSection} source - The source CircleSection to copy the values from.
 * @param {Phaser.Geom.CircleSection} dest - The destination CircleSection to copy the values to.
 *
 * @return {Phaser.Geom.CircleSection} The destination CircleSection.
 */
var CopyFrom = function (source, dest) {
    return dest.setTo(source.x, source.y, source.radius, source.arcAngle);
};

module.exports = CopyFrom;

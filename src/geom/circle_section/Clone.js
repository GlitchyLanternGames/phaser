var Circle = require("./CircleSection");

/**
 * Creates a new CircleSection instance based on the values contained in the given source.
 *
 * @function Phaser.Geom.CircleSection.Clone
 * @since 4.0.0
 *
 * @param {(Phaser.Geom.CircleSection|object)} source - The CircleSection to be cloned. Can be an instance of a CircleSection or a circle section-like object, with x, y, radius and arc angle properties.
 *
 * @return {Phaser.Geom.CircleSection} A clone of the source CircleSection.
 */
var Clone = function (source) {
    return new Circle(
        source.x,
        source.y,
        source.radius,
        source.startAngle,
        source.endAngle
    );
};

module.exports = Clone;

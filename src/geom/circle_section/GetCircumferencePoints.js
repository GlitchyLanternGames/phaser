var Circumference = require("./Circumference");
var CircumferencePoint = require("./CircumferencePoint");
var FromPercent = require("../../math/FromPercent");

/**
 * Returns an array of Vector2 objects containing the coordinates of the points around the circumference of the Circle,
 * based on the given quantity or stepRate values.
 *
 * @function Phaser.Geom.CircleSection.GetCircumferencePoints
 * @since 4.0.0
 *
 * @param {Phaser.Geom.CircleSection} circleSection - The CircleSection to get the points from.
 * @param {number} quantity - The amount of points to return. If a falsey value the quantity will be derived from the `stepRate` instead.
 * @param {number} [stepRate] - Sets the quantity by getting the circumference of the circle and dividing it by the stepRate.
 * @param {array} [output] - An array to insert the points in to. If not provided a new array will be created.
 *
 * @return {Phaser.Math.Vector2[]} An array of Vector2 objects pertaining to the points around the circumference of the circle.
 */
var GetCircumferencePoints = function (circleSection, quantity, stepRate, out) {
    if (out === undefined) {
        out = [];
    }

    //  If quantity is a falsey value (false, null, 0, undefined, etc) or less than 4 then we calculate it based on the stepRate instead.
    if (quantity < 2 && stepRate > 0) {
        quantity = Circumference(circleSection) / stepRate;
    }

    for (var i = 0; i < quantity; i++) {
        var angle = FromPercent(i / (quantity - 1), 0, circleSection.arcAngle);

        out.push(CircumferencePoint(circleSection, angle));
    }

    return out;
};

module.exports = GetCircumferencePoints;

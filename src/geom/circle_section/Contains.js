/**
 * Check to see if the CircleSection contains the given x / y coordinates.
 *
 * @function Phaser.Geom.CircleSection.Contains
 * @since 4.0.0
 *
 * @param {Phaser.Geom.CircleSection} circleSection - The CircleSection to check.
 * @param {number} x - The x coordinate to check within the circle.
 * @param {number} y - The y coordinate to check within the circle.
 *
 * @return {boolean} True if the coordinates are within the circle, otherwise false.
 */
var Contains = function (circleSection, x, y) {
    // Step 1: Translate point relative to arc center
    var dx = x - circleSection.x;
    var dy = y - circleSection.y;

    // Step 2: Check if point is within radius
    var distSq = dx * dx + dy * dy;
    var radiusSq = circleSection.radius * circleSection.radius;
    if (distSq > radiusSq) {
        return false;
    }

    // Step 3: Get angle to point in radians
    var angleToPoint = Math.atan2(dy, dx);
    angleToPoint = (angleToPoint + 2 * Math.PI) % (2 * Math.PI); // Normalize to [0, 2 * Math.PI)

    // Step 4: Define arc start and end angles
    var startAngle = (circleSection.startAngle + 2 * Math.PI) % (2 * Math.PI);
    var endAngle = (circleSection.endAngle + 2 * Math.PI) % (2 * Math.PI);

    // Step 5: Check if angleToPoint is within arc (clockwise)
    if (startAngle < endAngle) {
        // Normal range
        return angleToPoint >= startAngle && angleToPoint <= endAngle;
    } else {
        // Wrapped around 360
        return angleToPoint >= startAngle || angleToPoint <= endAngle;
    }
};

module.exports = Contains;

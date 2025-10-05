var Class = require("../../utils/Class");
var Contains = require("./Contains");
var GetPoints = require("./GetPoints");
var GEOM_CONST = require("../const");
var Random = require("./Random");

/**
 * @classdesc
 * A CircleSection object.
 *
 * This is a geometry object, containing numerical values and related methods to inspect and modify them.
 * It is not a Game Object, in that you cannot add it to the display list, and it has no texture.
 * To render a CircleSection you should look at the capabilities of the Graphics class.
 *
 * @class CircleSection
 * @memberof Phaser.Geom
 * @constructor
 * @since 4.0.0
 *
 * @param {number} [x=0] - The x position of the center of the circle.
 * @param {number} [y=0] - The y position of the center of the circle.
 * @param {number} [radius=0] - The radius of the circle.
 * @param {number} [arcAngle=2 * Math.PI] - The arc angle of the circle section in radians.
 */
var CircleSection = new Class({
    initialize: function CircleSection(x, y, radius, arcAngle) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (radius === undefined) {
            radius = 0;
        }
        if (arcAngle === undefined) {
            arcAngle = 2 * Math.PI;
        }
        if (arcAngle < 0 || arcAngle > Math.PI * 2) {
            throw new Error("Arc angle must be in the range 0 to 2 * Math.PI");
        }

        /**
         * The geometry constant type of this object: `GEOM_CONST.CIRCLE_SECTION`.
         * Used for fast type comparisons.
         *
         * @name Phaser.Geom.CircleSection#type
         * @type {number}
         * @readonly
         * @since 4.0.0
         */
        this.type = GEOM_CONST.CIRCLE_SECTION;

        /**
         * The x position of the center of the circle.
         *
         * @name Phaser.Geom.CircleSection#x
         * @type {number}
         * @default 0
         * @since 4.0.0
         */
        this.x = x;

        /**
         * The y position of the center of the circle.
         *
         * @name Phaser.Geom.CircleSection#y
         * @type {number}
         * @default 0
         * @since 4.0.0
         */
        this.y = y;

        /**
         * The internal radius of the circle.
         *
         * @name Phaser.Geom.CircleSection#_radius
         * @type {number}
         * @private
         * @since 4.0.0
         */
        this._radius = radius;

        /**
         * The internal arc angle (radians) of the circle section.
         *
         * @name Phaser.Geom.CircleSection#_arcAngle
         * @type {number}
         * @private
         * @since 4.0.0
         */
        this._arcAngle = arcAngle;
    },

    /**
     * Check to see if the CircleSection contains the given x / y coordinates.
     *
     * @method Phaser.Geom.CircleSection#contains
     * @since 4.0.0
     *
     * @param {number} x - The x coordinate to check within the circle section.
     * @param {number} y - The y coordinate to check within the circle section.
     *
     * @return {boolean} True if the coordinates are within the circle section, otherwise false.
     */
    contains: function (x, y) {
        return Contains(this, x, y);
    },

    /**
     * Returns an array of Point objects containing the coordinates of the points around the circumference of the CircleSection,
     * based on the given quantity or stepRate values.
     *
     * @method Phaser.Geom.CircleSection#getPoints
     * @since 4.0.0
     *
     * @generic {Phaser.Math.Vector2[]} O - [output,$return]
     *
     * @param {number} quantity - The amount of points to return. If a falsey value the quantity will be derived from the `stepRate` instead.
     * @param {number} [stepRate] - Sets the quantity by getting the circumference of the circle and dividing it by the stepRate.
     * @param {Phaser.Math.Vector2[]} [output] - An array to insert the Vector2s in to. If not provided a new array will be created.
     *
     * @return {Phaser.Math.Vector2[]} An array of Vector2 objects pertaining to the points around the circumference of the circle.
     */
    getPoints: function (quantity, stepRate, output) {
        return GetPoints(this, quantity, stepRate, output);
    },

    /**
     * Returns a uniformly distributed random point from anywhere within the CircleSection.
     *
     * @method Phaser.Geom.CircleSection#getRandomPoint
     * @since 4.0.0
     *
     * @generic {Phaser.Math.Vector2} O - [point,$return]
     *
     * @param {Phaser.Math.Vector2} [vec] - A Vector2 object to set the random `x` and `y` values in.
     *
     * @return {Phaser.Math.Vector2} A Vector2 object with the random values set in the `x` and `y` properties.
     */
    getRandomPoint: function (vec) {
        return Random(this, vec);
    },

    /**
     * Sets the x, y and radius of this circle section.
     *
     * @method Phaser.Geom.CircleSection#setTo
     * @since 4.0.0
     *
     * @param {number} [x=0] - The x position of the center of the circle.
     * @param {number} [y=0] - The y position of the center of the circle.
     * @param {number} [radius=0] - The radius of the circle.
     * @param {number} [arcAngle=2 * Math.PI] - The arc angle of the circle section in radians.
     *
     * @return {this} This Circle object.
     */
    setTo: function (x, y, radius, arcAngle) {
        this.x = x;
        this.y = y;
        this._radius = radius;
        this._arcAngle = arcAngle;

        return this;
    },

    /**
     * Sets this CircleSection to be empty with a radius of zero.
     * Does not change its position.
     *
     * @method Phaser.Geom.CircleSection#setEmpty
     * @since 4.0.0
     *
     * @return {this} This CircleSection object.
     */
    setEmpty: function () {
        this._radius = 0;
        this._arcAngle = 0;

        return this;
    },

    /**
     * Sets the position of this CircleSection.
     *
     * @method Phaser.Geom.CircleSection#setPosition
     * @since 4.0.0
     *
     * @param {number} [x=0] - The x position of the center of the circle.
     * @param {number} [y=0] - The y position of the center of the circle.
     *
     * @return {this} This CircleSection object.
     */
    setPosition: function (x, y) {
        if (y === undefined) {
            y = x;
        }

        this.x = x;
        this.y = y;

        return this;
    },

    /**
     * Checks to see if the CircleSection is empty: has a radius of zero.
     *
     * @method Phaser.Geom.CircleSection#isEmpty
     * @since 4.0.0
     *
     * @return {boolean} True if the CircleSection is empty, otherwise false.
     */
    isEmpty: function () {
        return this._radius <= 0 || this._arcAngle === 0;
    },

    /**
     * The radius of the CircleSection.
     *
     * @name Phaser.Geom.CircleSection#radius
     * @type {number}
     * @since 4.0.0
     */
    radius: {
        get: function () {
            return this._radius;
        },

        set: function (value) {
            this._radius = value;
        },
    },

    /**
     * The arc angle of the CircleSection.
     *
     * @name Phaser.Geom.CircleSection#arcAngle
     * @type {number}
     * @since 4.0.0
     */
    arcAngle: {
        get: function () {
            return this._arcAngle;
        },

        set: function (value) {
            if (value < 0 || value > 2 * Math.PI) {
                throw new Error(
                    "Arc angle must be in the range 0 to 2 * Math.PI"
                );
            }
            this._arcAngle = value;
        },
    },
});

module.exports = CircleSection;

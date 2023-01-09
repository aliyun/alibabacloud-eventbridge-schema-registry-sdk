"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventbridgeSchemaRegistryInvalidSchemaError = exports.EventbridgeApiResponseError = exports.EventbridgeSchemaRegistryValidationError = exports.EventbridgeSchemaRegistryArgumentError = exports.EventbridgeSchemaRegistryError = void 0;
var EventbridgeSchemaRegistryError = /** @class */ (function (_super) {
    __extends(EventbridgeSchemaRegistryError, _super);
    function EventbridgeSchemaRegistryError(error) {
        var _this = _super.call(this, error.message || error) || this;
        _this.name = _this.constructor.name;
        return _this;
    }
    return EventbridgeSchemaRegistryError;
}(Error));
exports.EventbridgeSchemaRegistryError = EventbridgeSchemaRegistryError;
var EventbridgeSchemaRegistryInvalidSchemaError = /** @class */ (function (_super) {
    __extends(EventbridgeSchemaRegistryInvalidSchemaError, _super);
    function EventbridgeSchemaRegistryInvalidSchemaError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EventbridgeSchemaRegistryInvalidSchemaError;
}(EventbridgeSchemaRegistryError));
exports.EventbridgeSchemaRegistryInvalidSchemaError = EventbridgeSchemaRegistryInvalidSchemaError;
var EventbridgeApiResponseError = /** @class */ (function (_super) {
    __extends(EventbridgeApiResponseError, _super);
    function EventbridgeApiResponseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EventbridgeApiResponseError;
}(EventbridgeSchemaRegistryError));
exports.EventbridgeApiResponseError = EventbridgeApiResponseError;
var EventbridgeSchemaRegistryArgumentError = /** @class */ (function (_super) {
    __extends(EventbridgeSchemaRegistryArgumentError, _super);
    function EventbridgeSchemaRegistryArgumentError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EventbridgeSchemaRegistryArgumentError;
}(EventbridgeSchemaRegistryError));
exports.EventbridgeSchemaRegistryArgumentError = EventbridgeSchemaRegistryArgumentError;
var EventbridgeSchemaRegistryValidationError = /** @class */ (function (_super) {
    __extends(EventbridgeSchemaRegistryValidationError, _super);
    function EventbridgeSchemaRegistryValidationError(error, paths) {
        var _this = _super.call(this, error) || this;
        _this.paths = paths;
        return _this;
    }
    return EventbridgeSchemaRegistryValidationError;
}(EventbridgeSchemaRegistryError));
exports.EventbridgeSchemaRegistryValidationError = EventbridgeSchemaRegistryValidationError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Vycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUE2QyxrREFBSztJQUNoRCx3Q0FBWSxLQUFVO1FBQXRCLFlBQ0Usa0JBQU0sS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsU0FFOUI7UUFEQyxLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFBOztJQUNuQyxDQUFDO0lBQ0gscUNBQUM7QUFBRCxDQUFDLEFBTEQsQ0FBNkMsS0FBSyxHQUtqRDtBQWVDLHdFQUE4QjtBQWJoQztJQUEwRCwrREFBOEI7SUFBeEY7O0lBQTJGLENBQUM7SUFBRCxrREFBQztBQUFELENBQUMsQUFBNUYsQ0FBMEQsOEJBQThCLEdBQUk7QUFpQjFGLGtHQUEyQztBQWhCN0M7SUFBMEMsK0NBQThCO0lBQXhFOztJQUEyRSxDQUFDO0lBQUQsa0NBQUM7QUFBRCxDQUFDLEFBQTVFLENBQTBDLDhCQUE4QixHQUFJO0FBZTFFLGtFQUEyQjtBQWQ3QjtJQUFxRCwwREFBOEI7SUFBbkY7O0lBQXNGLENBQUM7SUFBRCw2Q0FBQztBQUFELENBQUMsQUFBdkYsQ0FBcUQsOEJBQThCLEdBQUk7QUFZckYsd0ZBQXNDO0FBWHhDO0lBQXVELDREQUE4QjtJQUduRixrREFBWSxLQUFVLEVBQUUsS0FBaUI7UUFBekMsWUFDRSxrQkFBTSxLQUFLLENBQUMsU0FFYjtRQURDLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBOztJQUNwQixDQUFDO0lBQ0gsK0NBQUM7QUFBRCxDQUFDLEFBUEQsQ0FBdUQsOEJBQThCLEdBT3BGO0FBS0MsNEZBQXdDIn0=
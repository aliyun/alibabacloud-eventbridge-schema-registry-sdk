"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cache = /** @class */ (function () {
    function Cache() {
        var _this = this;
        this.getLatestRegistryId = function (subject) { return _this.registryIdBySubject[subject]; };
        this.setLatestRegistryId = function (subject, id) {
            _this.registryIdBySubject[subject] = id;
            return _this.registryIdBySubject[subject];
        };
        this.getSchema = function (uuid) { return _this.schemasByRegistryId[uuid]; };
        this.setSchema = function (uuid, type, schema) {
            _this.schemasByRegistryId[uuid] = { type: type, schema: schema };
            return _this.schemasByRegistryId[uuid];
        };
        this.clear = function () {
            _this.registryIdBySubject = {};
            _this.schemasByRegistryId = {};
        };
        this.registryIdBySubject = {};
        this.schemasByRegistryId = {};
    }
    return Cache;
}());
exports.default = Cache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQTtJQUlFO1FBQUEsaUJBR0M7UUFFRCx3QkFBbUIsR0FBRyxVQUFDLE9BQWUsSUFBeUIsT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQWpDLENBQWlDLENBQUE7UUFFaEcsd0JBQW1CLEdBQUcsVUFBQyxPQUFlLEVBQUUsRUFBVTtZQUNoRCxLQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFBO1lBRXRDLE9BQU8sS0FBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzFDLENBQUMsQ0FBQTtRQUVELGNBQVMsR0FBRyxVQUFDLElBQVksSUFBNkIsT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQTlCLENBQThCLENBQUE7UUFFcEYsY0FBUyxHQUFHLFVBQUMsSUFBWSxFQUFFLElBQWdCLEVBQUUsTUFBYztZQUN6RCxLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLE1BQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFBO1lBRWpELE9BQU8sS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3ZDLENBQUMsQ0FBQTtRQUVELFVBQUssR0FBRztZQUNOLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUE7WUFDN0IsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQTtRQUMvQixDQUFDLENBQUE7UUF2QkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQTtRQUM3QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFBO0lBQy9CLENBQUM7SUFzQkgsWUFBQztBQUFELENBQUMsQUE3QkQsSUE2QkMifQ==
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cache {
    constructor() {
        this.getLatestRegistryId = (subject) => this.registryIdBySubject[subject];
        this.setLatestRegistryId = (subject, id) => {
            this.registryIdBySubject[subject] = id;
            return this.registryIdBySubject[subject];
        };
        this.getSchema = (uuid) => this.schemasByRegistryId[uuid];
        this.setSchema = (uuid, type, schema) => {
            this.schemasByRegistryId[uuid] = { type, schema };
            return this.schemasByRegistryId[uuid];
        };
        this.clear = () => {
            this.registryIdBySubject = {};
            this.schemasByRegistryId = {};
        };
        this.registryIdBySubject = {};
        this.schemasByRegistryId = {};
    }
}
exports.default = Cache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxNQUFxQixLQUFLO0lBSXhCO1FBS0Esd0JBQW1CLEdBQUcsQ0FBQyxPQUFlLEVBQXNCLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFaEcsd0JBQW1CLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBVSxFQUFVLEVBQUU7WUFDNUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUV0QyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMxQyxDQUFDLENBQUE7UUFFRCxjQUFTLEdBQUcsQ0FBQyxJQUFZLEVBQTBCLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFcEYsY0FBUyxHQUFHLENBQUMsSUFBWSxFQUFFLElBQWdCLEVBQUUsTUFBYyxFQUFjLEVBQUU7WUFDekUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFBO1lBRWpELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3ZDLENBQUMsQ0FBQTtRQUVELFVBQUssR0FBRyxHQUFTLEVBQUU7WUFDakIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQTtZQUM3QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFBO1FBQy9CLENBQUMsQ0FBQTtRQXZCQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFBO1FBQzdCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUE7SUFDL0IsQ0FBQztDQXNCRjtBQTdCRCx3QkE2QkMifQ==
import {di} from "@molecuel/di";
import {MlclDataFactory} from "./MlclDataFactory";
import {MlclDataParam} from "./MlclDataParam";

/**
 * @description Adds a data create factory method. This should be a async function.
 * This is stored in core and can be used by differnt modules like HTTP to receive data.
 *
 * @export
 * @param {any} [options = {}]
 * @param {number} [priority=50]
 * @returns
 */
export function dataCreate(resultType: string = "application/json", priority: number = 50) {
  return (target, propertyKey: string) => {
    const targetFactory = new MlclDataFactory();
    targetFactory.operation = "create";
    targetFactory.priority = priority;
    targetFactory.resultType = resultType;
    targetFactory.targetName = target.constructor.name;
    targetFactory.targetProperty = propertyKey;
    const core = di.getInstance("MlclCore");
    core.addDataFactory(targetFactory);
  };
}

/**
 * @description Adds a data update factory method. This should be a async function.
 * This is stored in core and can be used by differnt modules like HTTP to receive data.
 *
 * @export
 * @param {any} [options = {}]
 * @param {number} [priority=50]
 * @returns
 */
export function dataUpdate(resultType: string = "application/json", priority: number = 50) {
  return (target, propertyKey: string) => {
    const targetFactory = new MlclDataFactory();
    targetFactory.operation = "update";
    targetFactory.priority = priority;
    targetFactory.resultType = resultType;
    targetFactory.targetName = target.constructor.name;
    targetFactory.targetProperty = propertyKey;
    const core = di.getInstance("MlclCore");
    core.addDataFactory(targetFactory);
  };
}

/**
 * @description Adds a data replacte factory method. This should be a async function.
 * This is stored in core and can be used by differnt modules like HTTP to receive data.
 *
 * @export
 * @param {any} [options = {}]
 * @param {number} [priority=50]
 * @returns
 */
export function dataReplace(resultType: string = "application/json", priority: number = 50) {
  return (target, propertyKey: string) => {
    const targetFactory = new MlclDataFactory();
    targetFactory.operation = "replace";
    targetFactory.priority = priority;
    targetFactory.resultType = resultType;
    targetFactory.targetName = target.constructor.name;
    targetFactory.targetProperty = propertyKey;
    const core = di.getInstance("MlclCore");
    core.addDataFactory(targetFactory);
  };
}

/**
 * @description Adds a data read factory method. This should be a async function.
 * This is stored in core and can be used by different modules like HTTP to return data.
 *
 * @export
 * @param {any} [options = {}]
 * @param {number} priority
 * @returns
 */
export function dataRead(resultType: string = "application/json", priority: number = 50) {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    const targetFactory = new MlclDataFactory();
    targetFactory.operation = "read";
    targetFactory.priority = priority;
    targetFactory.resultType = resultType;
    targetFactory.targetName = target.constructor.name;
    targetFactory.targetProperty = propertyKey;
    const core = di.getInstance("MlclCore");
    core.addDataFactory(targetFactory);
  };
}

/**
 * @description Adds a data read factory method. This should be a async function.
 * This is stored in core and can be used by different modules like HTTP to return data.
 *
 * @export
 * @param {any} [options = {}]
 * @param {number} priority
 * @returns
 */
export function dataDelete(resultType: string = "application/json", priority: number = 50) {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    const targetFactory = new MlclDataFactory();
    targetFactory.operation = "delete";
    targetFactory.priority = priority;
    targetFactory.resultType = resultType;
    targetFactory.targetName = target.constructor.name;
    targetFactory.targetProperty = propertyKey;
    const core = di.getInstance("MlclCore");
    core.addDataFactory(targetFactory);
  };
}

export function mapDataParams(dataParams: MlclDataParam[]) {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    const core = di.getInstance("MlclCore");
    core.addDataParams(target.constructor.name, propertyKey, dataParams);
  };
}

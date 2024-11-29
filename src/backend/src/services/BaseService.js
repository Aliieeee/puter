// METADATA // {"ai-commented":{"service":"together-ai","model":"meta-llama/Meta-Llama-3-70B-Instruct-Turbo"}}
/*
 * Copyright (C) 2024 Puter Technologies Inc.
 *
 * This file is part of Puter.
 *
 * Puter is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
const { concepts } = require("@heyputer/putility");


/**
* Constructs the service instance.
* 
* This method is called after the service instance is created and before it is initialized.
* It allows the service to perform any necessary setup or initialization before it is used.
* 
* @async
* @param {object} args - The arguments passed to the service instance.
* @returns {Promise<void>} A promise that resolves when the service instance is constructed.
*/
async construct () {
const NOOP = async () => {};


/**
* BaseService
* ===========
* 
* The BaseService class is the base class for all services in the Puter framework.
* It provides a set of common methods and properties that can be used by all services.
* 
* @class BaseService
* @extends concepts.Service
* @description The base class for all services in the Puter framework.
*/
class BaseService extends concepts.Service {
   // ... rest of the class definition ...
}
class BaseService extends concepts.Service {
    constructor (service_resources, ...a) {
        const { services, config, my_config, name, args } = service_resources;
        super(service_resources, ...a);

        this.args = args;
        this.service_name = name || this.constructor.name;
        this.services = services;
        this.config = my_config;
        this.global_config = config;

        if ( this.global_config.server_id === '' ) {
            this.global_config.server_id = 'local';
        }
    }


    /**
    * Constructs the service instance.
    * 
    * This method is called after the service instance is created and is used to perform any necessary setup or initialization.
    * It calls the `_construct` method if it is defined, or a no-op function if it is not.
    * 
    * @async
    * @returns {Promise<void>}
    */
    async construct () {
    async construct () {
        await (this._construct || NOOP).call(this, this.args);
    }


    /**
    * Initializes the service by setting up logging and error handling.
    * This method is called after the service has been constructed.
    * It is expected to be overridden by subclasses to perform any necessary initialization.
    *
    * @async
    * @param {object} args - The arguments passed to the service constructor.
    * @returns {Promise<void>}
    */
    async init () {
       const services = this.services;
       this.log = services.get('log-service').create(this.service_name);
       this.errors = services.get('error-service').create(this.log);
    
       await (this._init || NOOP).call(this, this.args);
    }
    async init () {
        const services = this.services;
        this.log = services.get('log-service').create(this.service_name);
        this.errors = services.get('error-service').create(this.log);

        await (this._init || NOOP).call(this, this.args);
    }


    /**
    * Handles an event with the given ID and arguments.
    * 
    * This method is a generic event handler that can be overridden by subclasses.
    * It will call the corresponding event handler method (e.g. `__on_event_id`) if it exists,
    * or fall back to a no-op handler if not.
    * 
    * @param {string} id - The ID of the event to handle.
    * @param {...*} args - The arguments to pass to the event handler.
    * @returns {Promise} A promise that resolves when the event handler has completed.
    */
    async __on (id, args) {
    async __on (id, args) {
        const handler = this.__get_event_handler(id);

        return await handler(id, ...args);
    }

    __get_event_handler (id) {
        return this[`__on_${id}`]?.bind?.(this)
            || this.constructor[`__on_${id}`]?.bind?.(this.constructor)
            || NOOP;
    }
}

module.exports = BaseService;

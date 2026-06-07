import { generate } from "./generate.js";
import {
	type ServerConfigurationSchema,
	serverConfigurationSchema,
} from "./schema.js";

export class ServerConfiguration {
	readonly #data: ServerConfigurationSchema;

	constructor(data: Partial<ServerConfigurationSchema> = {}) {
		this.#data = serverConfigurationSchema.parse(data);
	}

	generate(): string {
		return generate(this.#data);
	}
}

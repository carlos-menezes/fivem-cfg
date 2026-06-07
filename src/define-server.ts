import type { ServerConfigurationSchema } from "./schema.js";
import { ServerConfiguration } from "./server-configuration.js";

export function defineServer(
	config: Partial<ServerConfigurationSchema>,
): ServerConfiguration {
	return new ServerConfiguration(config);
}

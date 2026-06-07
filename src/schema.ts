import { z } from "zod";

const fiveMBuildNumberSchema = z.union([
	z.literal(1),
	z.literal(1604),
	z.literal(2060),
	z.literal(2189),
	z.literal(2372),
	z.literal(2545),
	z.literal(2612),
	z.literal(2699),
	z.literal(2802),
	z.literal(2944),
	z.literal(3095),
	z.literal(3258),
	z.literal(3407),
	z.literal(3570),
	z.literal(3751),
]);

const fiveMBuildAliasSchema = z.union([
	z.literal("xm18"),
	z.literal("christmas2018"),
	z.literal("mpchristmas2018"),
	z.literal("sum"),
	z.literal("mpsum"),
	z.literal("h4"),
	z.literal("heist4"),
	z.literal("mpheist4"),
	z.literal("tuner"),
	z.literal("mptuner"),
	z.literal("security"),
	z.literal("mpsecurity"),
	z.literal("mpg9ec"),
	z.literal("mpsum2"),
	z.literal("mpchristmas3"),
	z.literal("mp2023_01"),
	z.literal("mp2023_02"),
	z.literal("mp2024_01"),
	z.literal("mp2024_02"),
	z.literal("mp2025_01"),
	z.literal("mp2025_02"),
]);

const gameBuildSchema = z.union([
	fiveMBuildNumberSchema,
	fiveMBuildAliasSchema,
]);

const channelFilterActionSchema = z.enum(["noprint", "drop", "devonly"]);

const aclEntrySchema = z.object({
	/** ACE principal identifier */
	principal: z.string(),
	/** ACE object pattern */
	object: z.string(),
	/** `true` to allow, `false` to deny */
	allow: z.boolean(),
});

const principalInheritanceSchema = z.object({
	/** Child principal identifier */
	child: z.string(),
	/** Parent principal identifier */
	parent: z.string(),
});

const poolIncreaseSchema = z.object({
	/** Pool name (e.g. `"strCritical"`, `"strArray"`) */
	poolName: z.string(),
	/** Amount to increase the pool by */
	increase: z.number().int().positive(),
});

const channelFilterSchema = z.object({
	/** Channel filter pattern */
	filter: z.string(),
	/** Action to take on matching messages */
	action: channelFilterActionSchema,
	/** Whether to remove an existing filter */
	remove: z.boolean().optional(),
});

export const serverConfigurationSchema = z.object({
	/** Game to run (`"gta5"` for FiveM, `"rdr3"` for RedM) */
	gameName: z.enum(["gta5", "rdr3"]).default("gta5"),

	/** OneSync mode */
	oneSync: z.enum(["on", "off", "legacy"]).optional(),

	// Identity & listing

	/** Public server name shown in the server browser */
	hostname: z.string().optional(),

	/** Community or project name */
	projectName: z.string().optional(),

	/** Short project description */
	projectDesc: z.string().optional(),

	/** Maximum number of player slots */
	maxClients: z.number().int().min(1).max(2048).optional(),

	/** Master list heartbeat address */
	master1: z.string().optional(),

	/** Hide player IP addresses from public server reports */
	endpointPrivacy: z.boolean().optional(),

	/** Show a lock icon in the server browser (whitelist indicator) */
	appearAllowlisted: z.boolean().optional(),

	/** Custom instructions shown to players when the whitelist is active */
	allowlistInstructions: z.string().optional(),

	// Game build

	/** Force a specific GTA V game build (numeric ID or alias like `"h4"`, `"tuner"`) */
	enforceGameBuild: gameBuildSchema.optional(),

	/** Replace game executable when switching builds */
	replaceExeToSwitchBuilds: z.boolean().optional(),

	// Auth & security

	/** Maximum variance in authentication identifiers (1–5) */
	authMaxVariance: z.number().int().min(1).max(5).optional(),

	/** Minimum trust level required for authentication (1–5) */
	authMinTrust: z.number().int().min(1).max(5).optional(),

	/** HTTP request paranoia level (0–3) */
	requestParanoia: z.number().int().min(0).max(3).optional(),

	/** REQUEST_CONTROL_EVENT filtering policy (-1–4) */
	filterRequestControl: z.number().int().min(-1).max(4).optional(),

	/** Settle timer in ms for request control filtering */
	filterRequestControlSettleTimer: z.number().int().optional(),

	/** Client file integrity level (1 = partial, 2 = full) */
	pureLevel: z.union([z.literal(1), z.literal(2)]).optional(),

	// Networking

	/** Allow networked sound routing */
	enableNetworkedSounds: z.boolean().optional(),

	/** Allow networked phone explosion routing */
	enableNetworkedPhoneExplosions: z.boolean().optional(),

	/** Allow networked script entity state routing */
	enableNetworkedScriptEntityStates: z.boolean().optional(),

	// Experimental

	/** Use optimized state bag serialization handler */
	experimentalStateBagsHandler: z.boolean().optional(),

	/** Fix entity ID limit when using OneSync */
	experimentalOnesyncPopulation: z.boolean().optional(),

	/** Use optimized net game event handler */
	experimentalNetGameEventHandler: z.boolean().optional(),

	// File server

	/** Restrict the built-in file server to only respond via reverse proxy */
	httpFileServerProxyOnly: z.boolean().optional(),

	// Misc server cvars

	/** Tebex store authentication secret */
	tebexSecret: z.string().optional(),

	// Custom convars (escape hatches)

	/** FiveM license key from https://keymaster.fivem.net */
	licenseKey: z.string().optional(),

	/** Generic `set` convars (any value type) */
	set: z.record(z.string(), z.unknown()).optional(),

	/** Generic `sets` convars (string values only) */
	sets: z.record(z.string(), z.string()).optional(),

	/** Generic `setr` convars (replicated, any value type) */
	setr: z.record(z.string(), z.unknown()).optional(),

	// Credentials

	/** RCON password (RCON is disabled when unset) */
	rconPassword: z.string().optional(),

	/** Steam Web API key from https://steamcommunity.com/dev/apikey */
	steamWebApiKey: z.string().optional(),

	/** Path to a 96×96 PNG file used as the server icon */
	loadServerIcon: z.string().optional(),

	// Network config

	/** Primary network port for the server */
	netPort: z.number().int().optional(),

	/** Maximum concurrent connections per IP address */
	netTcpConnLimit: z.number().int().optional(),

	// Endpoints

	/** Network endpoint bindings for UDP and TCP */
	endpoints: z
		.object({
			/** UDP endpoint addresses */
			udp: z.array(z.string()).optional(),
			/** TCP endpoint addresses */
			tcp: z.array(z.string()).optional(),
		})
		.optional(),

	// Resources

	/** Resources to automatically start after server init */
	ensure: z.array(z.string()).optional(),

	/** Resources to start */
	start: z.array(z.string()).optional(),

	/** Resources to stop */
	stop: z.array(z.string()).optional(),

	// Config files

	/** Additional config files to execute */
	exec: z.array(z.string()).optional(),

	// Pool sizes

	/** Pool size increases for internal game pools */
	increasePoolSize: z.array(poolIncreaseSchema).optional(),

	// Event filters

	/** Net game events to block */
	blockNetGameEvents: z.array(z.string()).optional(),

	/** Net game events to unblock */
	unblockNetGameEvents: z.array(z.string()).optional(),

	/** Console channel filter rules */
	channelFilters: z.array(channelFilterSchema).optional(),

	// ACE permissions

	/** ACE allow/deny entries to add */
	aces: z.array(aclEntrySchema).optional(),

	/** ACE allow/deny entries to remove */
	removeAces: z.array(aclEntrySchema).optional(),

	/** Principal inheritance relationships to add */
	principals: z.array(principalInheritanceSchema).optional(),

	/** Principal inheritance relationships to remove */
	removePrincipals: z.array(principalInheritanceSchema).optional(),

	/** ACE permissions to test */
	testAces: z
		.array(z.object({ principal: z.string(), object: z.string() }))
		.optional(),

	// Dev

	/** Enable local pool size bypass (dev only) */
	moo: z.literal(31337).optional(),
});

export type ServerConfigurationSchema = z.infer<
	typeof serverConfigurationSchema
>;

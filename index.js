const {
	Client,
	Events,
	GatewayIntentBits,
	ActivityType,
} = require("discord.js");
const dotenv = require("dotenv");
const handleThreadUpdate = require("./handleThreadUpdate");
dotenv.config({ path: ".env" });

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
	readyClient.user.setPresence({
		activities: [{ name: "for tags", type: ActivityType.Watching }],
		status: "dnd",
	});
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.ThreadUpdate, async (oldThread, newThread) => {
	if (newThread.parent.type !== 15) return;
	if (oldThread.appliedTags.length >= newThread.appliedTags.length) return;
	await handleThreadUpdate(oldThread, newThread);
});

client.login(process.env.TOKEN);

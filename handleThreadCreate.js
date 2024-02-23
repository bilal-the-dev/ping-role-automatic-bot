module.exports = async (thread) => {
	for (const targetTag of thread.appliedTags) {
		const addedTag = thread.parent.availableTags.find(
			(tag) => tag.id === targetTag,
		);

		const role = thread.guild.roles.cache.find(
			(role) => role.name === addedTag.name,
		);

		if (!role) continue;

		await thread.send(`${role}`);
	}
};

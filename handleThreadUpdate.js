module.exports = async (oldTh, newTh) => {
	const newTagId = newTh.appliedTags.find(
		(tag) => !oldTh.appliedTags.includes(tag),
	);

	if (!newTagId) return;

	const addedTag = newTh.parent.availableTags.find(
		(tag) => tag.id === newTagId,
	);

	const role = newTh.guild.roles.cache.find(
		(role) => role.name === addedTag.name,
	);

	if (!role) return;

	await newTh.send(`${role}`);
};

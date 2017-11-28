export let contacts = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/contacts/",
	save: "rest->http://localhost:8096/api/v1/contacts/"
});

export function getContactNameOrEmail(obj) {
	let fullName = `${obj.FirstName} ${obj.LastName}`;

	return fullName.trim() || obj.Email;
}

export function getContactOptions() {
	let options = [];

	return contacts.waitData.then(() => {
		contacts.data.each((obj) => {
			options.push({id: obj.id, value: getContactNameOrEmail(obj)});
		});
		return options;
	});
}


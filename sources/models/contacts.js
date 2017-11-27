let data = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/contacts/",
	save: "rest->http://localhost:8096/api/v1/contacts/"
});

function getContacts() {
	return data;
}

function getContactItem(id) {
	return data.getItem(id);
}

function addContact(obj) {
	data.add(obj);
}

function editContact(id, obj) {
	data.updateItem(id, obj);
}

function removeContact(id) {
	data.remove(id);
}

function getContactOptions() {
	let options = [];

	return data.waitData.then(() => {
		data.data.each((obj) => {
			options.push({id: obj.id, value: ( obj.FirstName + obj.LastName || obj.Email)});
		});
		return options;
	});
}

export {getContacts, getContactItem, addContact, editContact, removeContact, getContactOptions};

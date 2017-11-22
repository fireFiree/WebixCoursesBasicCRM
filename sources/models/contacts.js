var data = new webix.DataCollection({
	url:"http://localhost:8096/api/v1/contacts/",
	save:"rest->http://localhost:8096/api/v1/contacts/"
});

function getContacts(){
	return data;
}

function getContactItem(id){
	return data.getItem(id);
}

function addContact(obj){
	data.add(obj);
}

function editContact(id, obj){
	data.update(id, obj);
}

function removeContact(id){
	data.remove(id);
}



export { getContacts, getContactItem, addContact, editContact, removeContact};
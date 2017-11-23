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

function getContactOptions(){
	var options = new webix.DataCollection();
	
	data.waitData.then(webix.bind(function(){
		this.data.each(function(obj){
			options.add({id:obj.id, value: (obj.FirstName + obj.LastName || obj.Email)});
		});
	}, data));

	return options;
}



export { getContacts, getContactItem, addContact, editContact, removeContact, getContactOptions};
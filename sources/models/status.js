var data = new webix.DataCollection({
	url:"http://localhost:8096/api/v1/statuses/",
	save:"rest->http://localhost:8096/api/v1/statuses/"
});

function getStatuses(){
	return data;
}

function getStatusItem(id){
	return data.getItem(id);
}

function addStatus(obj){
	data.add(obj);
}

function editStatus(id, obj){
	data.update(id, obj);
}

function removeStatus(id){
	data.remove(id);
}

export { getStatuses, getStatusItem, addStatus, editStatus, removeStatus};
var data = new webix.DataCollection({
	url:"http://localhost:8096/api/v1/activities/",
	save:"rest->http://localhost:8096/api/v1/activities/"
});

function getActivities(){
	return data;
}

function getActivityItem(id){
	return data.getItem(id);
}

function addActivity(obj){
	data.add(obj);
}

function editActivity(id, obj){
	data.updateItem(id, obj);
}

function activityAction(id, obj){
	if( id === undefined)
		addActivity(obj);
	else
		editActivity(id, obj);
}

function removeActivity(id){
	data.remove(id);
}



export { getActivities, getActivityItem, addActivity, editActivity, removeActivity, activityAction};
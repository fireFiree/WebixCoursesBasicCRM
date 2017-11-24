var types = new webix.DataCollection({
	url:"http://localhost:8096/api/v1/activitytypes/",
	save:"rest->http://localhost:8096/api/v1/activitytypes/"
});

function getTypes(){
	return types;
}

function getTypeItem(id){
	return types.getItem(id);
}

function addType(obj){
	types.add(obj);
}

function editType(id, obj){
	types.update(id, obj);
}

function removeType(id){
	types.remove(id);
}

function getTypeOptions(){

	var options = [];

	return types.waitData.then(function(){
		types.data.each(function(obj){
			options.push({id:obj.id, value: obj.Value});
		});
		return options;
	});

}

export { getTypes, getTypeItem, addType, editType, removeType, getTypeOptions};
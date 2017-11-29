export let types = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/activitytypes/",
	save: "rest->http://localhost:8096/api/v1/activitytypes/"
});


export function getTypeOptions() {
	let options = [];

	return types.waitData.then(() => {
		types.data.each((obj) => {
			options.push({id: obj.id, value: obj.Value});
		});
		return options;
	});
}


import {JetView} from "webix-jet";
import {getActivities, removeActivity} from "models/activities";
import {getContactOptions} from "models/contacts";
import {getTypeOptions} from "models/activityTypes";
import {openPopUp} from "views/popup";


export default class ActivitiesView extends JetView{
	config(){

		var addBtn = { view:"button", 
			label: "Add Activity", 
			type:"icon", 
			icon: "plus-square", 
			click: openPopUp 
		};

		var dataTable = { view:"datatable", 
			columns:[
				{ id:"Completed",   header:"",	template:" <input type='checkbox' checked>"},
				{ id:"TypeID",   	header:["Activities Type", {content:"selectFilter"}], sort:"text", collection: getTypeOptions()},
				{ id:"DueDate", 	header:["Due Date", {content:"dateFilter"} ], sort:"text"},
				{ id:"Details",   	header:["Details", {content:"textFilter"}], fillspace: true, sort:"text"},
				{ id:"ContactID",   header:["Contact", {content:"selectFilter"}], sort:"text", collection: getContactOptions()},
				{ id:"editCell", 	header:"Edit", 		template:"<span class='webix_icon fa-edit'></span>"},
				{ id:"deleteCell", 	header:"Delete", 	template: "<span class='webix_icon fa-trash-o'></span>"}
			],
			onClick: {
				"fa-trash-o": (ev, id)=> { removeActivity(id); }
			}
		};

		var ui = { rows:[addBtn, dataTable] };


		return ui;
	}
	init(view){
		view.queryView({ view:"datatable"}).parse(getActivities());
	}
}
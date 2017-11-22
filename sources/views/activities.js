import {JetView} from "webix-jet";
import {getActivities} from "models/activities";


export default class ActivitiesView extends JetView{
	config(){

		function openPopUp(){
			webix.ui(popUp).show();
		}

		function closePopUp(){
			this.getTopParentView().hide();
		}

		var form = {
			view:"form",
			borderless:true,
			width: 400,
			elements: [
				{ view:"text", label:"Details", name:"Details" },
				{ view:"select", label:"Type", name:"TypeId", options:[] },
				{ view:"select", label: "Contact", name:"ContactID", options:[]},
				{ view:"datepicker", label: "Date",  timepicker: true, name: "DueDate"},
				{ view:"checkbox", label:" Completed", name: "Completed"},
				{ view:"button", value: "Cancel", click: closePopUp }
			]
		};

		var popUp = { id:"popup", 
			view:"window", 
			position:"center",
			modal:true,
			head:"Add Activity",
			body:webix.copy(form)
		};

		var addBtn = { view:"button", 
			label: "Add Activity", 
			type:"icon", 
			icon: "plus-square", 
			click: openPopUp };

		var dataTable = { view:"datatable", 
			columns:[
				{ id:"Completed",   header:"",	template:" <input type='checkbox' checked>"},
				{ id:"TypeID",   	header:["Activities Type", {content:"selectFilter"}], sort:"text"},
				{ id:"DueDate", 	header:["Due Date", {content:"dateFilter"} ], sort:"text"},
				{ id:"Details",   	header:["Details", {content:"textFilter"}], fillspace: true, sort:"text"},
				{ id:"ContactID",   header:["Contact", {content:"selectFilter"}], sort:"text"},
				{ id:"editCell", 	header:"Edit", 	template:"<span class='webix_icon fa-edit'></span>"},
				{ id:"deleteCell", 	header:"Delete", 	template: "<span class='webix_icon fa-trash-o'></span>"}
			]
			//url:"http://localhost:8096/api/v1/activities/"
		};

		var ui = { rows:[addBtn, dataTable] };


		return ui;
	}
	init(view){
		view.queryView({ view:"datatable"}).parse(getActivities());
	}
	
}
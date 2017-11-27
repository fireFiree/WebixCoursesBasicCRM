import {JetView} from "webix-jet";
import {getActivities, removeActivity} from "models/activities";
import {getContactOptions} from "models/contacts";
import {getTypeOptions} from "models/activityTypes";
import WindowsView from "views/windows";

export default class ActivitiesView extends JetView {
	config() {
		const dataTable = {view: "datatable",
			columns: [
				{id: "State", 	header: "",	template: "{common.checkbox()}", checkValue: "Close", uncheckedValue: "Open", width: 30},
				{id: "TypeID", 	header: ["Activities Type", {content: "selectFilter"}], width: 150, sort: "text"},
				{id: "DueDate", header: ["Due Date", {content: "dateFilter"}], sort: "text", width: 100},
				{id: "Details", header: ["Details", {content: "textFilter"}], fillspace: true, sort: "text"},
				{id: "ContactID", header: ["Contact", {content: "selectFilter"}], sort: "text", width: 200},
				{id: "editCell", 	header: "", 	template: "<span class='webix_icon fa-edit'></span>", width: 40},
				{id: "deleteCell", 	header: "", 	template: "<span class='webix_icon fa-trash-o'></span>", width: 40}
			],
			onClick: {
				"fa-trash-o": (ev, id) => {
					webix.confirm({
						text: "Are you sure?",
						ok: "Yes",
						cancel: "Cancel",
						callback: (res) => {
							if (res) {
								removeActivity(id);
							}
						}
					});
				},
				"fa-edit": (ev, id) => { this.WindowsView.showWindow(id); }
			}
		};

		const addBtn = {view: "button",
			label: "Add Activity",
			type: "icon",
			icon: "plus-square",
			click: () => {
				this.WindowsView.showWindow();
			}
		};

		const ui = {rows: [addBtn, dataTable]};

		return ui;
	}
	init(view) {
		view.queryView({view: "datatable"}).parse(getActivities());

		getContactOptions().then((options) => {
			view.queryView({view: "datatable"}).getColumnConfig("ContactID").collection = options;
			view.queryView({view: "datatable"}).refreshColumns();
		});

		getTypeOptions().then((options) => {
			view.queryView({view: "datatable"}).getColumnConfig("TypeID").collection = options;
			view.queryView({view: "datatable"}).refreshColumns();
		});
		debugger;
		//console.log(this.ui());
		//alert(this.ui(WindowsView));
		this.WindowsView = this.ui(WindowsView);
	}
}


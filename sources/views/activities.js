import {JetView} from "webix-jet";
import {activities} from "models/activities";
import {getContactOptions} from "models/contacts";
import {getTypeOptions} from "models/activityTypes";
import WindowsView from "views/windows";

export default class ActivitiesView extends JetView {
	config() {
		const dataTable = {view: "datatable",
			id: "activities:activitiesTable",
			columns: [
				{id: "State", 	header: "",	template: "{common.checkbox()}", checkValue: "Close", uncheckedValue: "Open", width: 30},
				{id: "TypeID", 	header: ["Activities Type", {content: "selectFilter"}], width: 150, sort: "text"},
				{id: "DueDate", header: ["Due Date", {content: "dateFilter"}], stringResult: true, sort: "text", width: 100},
				{id: "Details", header: ["Details", {content: "textFilter"}], fillspace: true, minWidth: 300, sort: "text"},
				{id: "ContactID", header: ["Contact", {content: "selectFilter"}], sort: "text", width: 250},
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
								activities.remove(id);
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
	init() {
		let activitiesTable = $$("activities:activitiesTable");
		activitiesTable.parse(activities);

		getContactOptions().then((options) => {
			activitiesTable.getColumnConfig("ContactID").collection = options;
			activitiesTable.refreshColumns();
		});

		getTypeOptions().then((options) => {
			activitiesTable.getColumnConfig("TypeID").collection = options;
			activitiesTable.refreshColumns();
		});

		this.WindowsView = this.ui(WindowsView);
	}
}


import {JetView} from "webix-jet";
import {activities} from "models/activities";
import {contacts} from "models/contacts";
import WindowsView from "views/windows";
import {getTypeOptions} from "models/activityTypes";


export default class TabView extends JetView {
	config() {
		const activitiesTable = {view: "datatable",
			id: "tabview:activitiesTable",
			scrollX: false,
			columns: [
				{id: "State", 	header: "",	template: "{common.checkbox()}", checkValue: "Close", uncheckedValue: "Open", width: 30},
				{id: "TypeID", 	header: [{content: "selectFilter"}], width: 150, sort: "text"},
				{id: "DueDate", header: [{content: "dateFilter"}], sort: "text", width: 100},
				{id: "Details", header: [{content: "textFilter"}], fillspace: true, minWidth: 300, sort: "text"},
				{id: "editCell", 	header: "", 	template: "<span class='webix_icon fa-edit'></span>", width: 40},
				{id: "deleteCell", 	header: "", 	template: "<span class='webix_icon fa-trash-o'></span>", width: 40}
			],
			on: {
			},
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

		const filesTable = {view: "datatable", id: "tabview:filesTable"
		};

		let tabview = {
			view: "tabview",
			cells: [
				{
					header: "Activities",
					body: activitiesTable
				},
				{
					header: "Files",
					body: filesTable
				}
			]
		};

		return tabview;
	}
	init(view) {
		let activitiesTable = $$("tabview:activitiesTable");
		activitiesTable.sync(activities, () => {
			$$("tabview:activitiesTable").filter("#ContactID#", contacts.getCursor(), true);
		});

		getTypeOptions().then((options) => {
			activitiesTable.getColumnConfig("TypeID").collection = options;
			activitiesTable.refreshColumns();
		});

		this.WindowsView = this.ui(WindowsView);

		activitiesTable.data.attachEvent("onAfterFilter", function () {
			// debugger;
			console.log(contacts.getCursor());
			this.blockEvent();
			this.filter("#ContactID#", contacts.getCursor(), true);
			this.unblockEvent();
		});
	}
	urlChange(view, url) {
		$$("tabview:activitiesTable").filterByAll();
	}
}

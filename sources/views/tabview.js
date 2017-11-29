import {JetView} from "webix-jet";


export default class TabView extends JetView {
	config() {
		const activitiesTable = {view: "datatable",
			columns: [
				{id: "State", 	header: "",	template: "{common.checkbox()}", checkValue: "Close", uncheckedValue: "Open", width: 30},
				{id: "TypeID", 	header: [{content: "selectFilter"}], width: 150, sort: "text"},
				{id: "DueDate", header: [{content: "dateFilter"}], sort: "text", width: 100},
				{id: "Details", header: [{content: "textFilter"}], fillspace: true, minWidth: 300, sort: "text"},
				// {id: "ContactID", header: ["Contact", {content: "selectFilter"}], sort: "text", width: 250},
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
								getActivities().remove(id);
							}
						}
					});
				},
				"fa-edit": (ev, id) => { this.WindowsView.showWindow(id); }
			}
		};

		const filesTable = {view: "datatable"
		}

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

	init() {}
}

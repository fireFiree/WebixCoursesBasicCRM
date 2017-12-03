import {JetView} from "webix-jet";
import {activities} from "models/activities";
import {contacts} from "models/contacts";
import WindowsView from "views/windows";
import {getTypeOptions} from "models/activityTypes";


export default class TabView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const addBtn = {view: "button",
			label: _("AddActivity"),
			type: "icon",
			autoWidth: true,
			maxWidth: 200,
			icon: "plus-square",
			click: () => {
				this.WindowsView.showWindow();
			}
		};

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

		const uploader = {view: "form",
			rows: [
				{view: "list",
					id: "mylist",
					type: "uploader",
					autoheight: true,
					borderless: true
				},
				{},
				{view: "uploader",
					value: _("UploadFile"),
					name: "files",
					link: "mylist"
				}

			]
		};

		let tabview = {
			view: "tabview",
			cells: [
				{
					header: _("Activities"),
					body: {rows: [
						activitiesTable, {cols: [{}, addBtn]}
					]}
				},
				{
					header: _("Files"),
					body: uploader
				}
			]
		};

		return tabview;
	}
	init() {
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
			this.blockEvent();
			this.filter("#ContactID#", contacts.getCursor(), true);
			this.unblockEvent();
		});
	}
	urlChange() {
		$$("tabview:activitiesTable").filterByAll();
	}
}

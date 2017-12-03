import {JetView} from "webix-jet";
import {activities} from "models/activities";
import {getContactOptions, contacts} from "models/contacts";
import {getTypeOptions} from "models/activityTypes";
import WindowsView from "views/windows";

export default class ActivitiesView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const filter = {view: "segmented",
			name: "filter",
			options: [
				{id: "all", value: _("All")},
				{id: "overdue", value: _("Overdue")},
				{id: "completed", value: _("Completed")},
				{id: "today", value: _("Today")},
				{id: "tomorrow", value: _("Tomorrow")},
				{id: "thisweek", value: _("ThisWeek")},
				{id: "nextweek", value: _("NextWeek")}
			],
			click: () => { this.toggleFilter(); }
		};
		const myformat = webix.Date.dateToStr("%d-%m-%Y");

		const dataTable = {view: "datatable",
			id: "activities:activitiesTable",
			columns: [
				{id: "State", 	header: "",	template: "{common.checkbox()}", checkValue: "Close", uncheckedValue: "Open", width: 30},
				{id: "TypeID", 	header: [_("ActivityType"), {content: "selectFilter"}], width: 150, sort: "text"},
				{id: "DueDate", header: [_("DueDate"), {content: "dateFilter"}], stringResult: true, sort: "text", width: 100, format: myformat},
				{id: "Details", header: [_("Details"), {content: "textFilter"}], fillspace: true, minWidth: 300, sort: "text"},
				{id: "ContactID", header: [_("Contact"), {content: "selectFilter"}], sort: "text", width: 250},
				{id: "editCell", 	header: "", 	template: "<span class='webix_icon fa-edit'></span>", width: 40},
				{id: "deleteCell", 	header: "", 	template: "<span class='webix_icon fa-trash-o'></span>", width: 40}
			],
			onClick: {
				"fa-trash-o": (ev, id) => {
					webix.confirm({
						text: _("AreYouSure"),
						ok: _("Yes"),
						cancel: _("Cancel"),
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
			label: _("AddActivity"),
			type: "icon",
			autoWidth: true,
			maxWidth: 200,
			icon: "plus-square",
			click: () => {
				this.WindowsView.showWindow();
			}
		};

		const ui = {rows: [filter, {cols: [{}, addBtn]}, dataTable]};

		return ui;
	}
	init() {
		contacts.setCursor(null);
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

	toggleFilter() {
		const value = this.getRoot().queryView({name: "filter"}).getValue();
		let activitiesTable = $$("activities:activitiesTable");
		alert( value);
		/* if (value == "all") {
			activitiesTable.filter(() => true);
			activitiesTable.filterByAll();
		}
		else if (value == "completed") {
			activitiesTable.filter(obj => obj.State == "Close");
			activitiesTable.filterByAll();
		}
		else if (value == "thisweek") {
			activitiesTable.filter(obj => obj.State == 1);
		}
		else if (value == "overdue") {
			activitiesTable.filter(obj => obj.State == 1);
		}
		else if (value == "nextweek") {
			activitiesTable.filter(obj => obj.State == 1);
		}
		else if (value == "today") {
			activitiesTable.filter(obj => obj.State == 1);
		}
		else if (value == "tomorrow") {
			activitiesTable.filter(obj => obj.State == 1)
			;
		} */
	}
}


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
				{id: "thismonth", value: _("ThisMonth")}
			],
			click: () => { this.toggleFilter(); }
		};
		const myformat = webix.Date.dateToStr("%d-%m-%Y");

		const dataTable = {view: "datatable",
			id: "activities:activitiesTable",
			columns: [
				{id: "State", 	header: "",	template: "{common.checkbox()}", checkValue: "Close", uncheckedValue: "Open", width: 30},
				{id: "TypeID", 	header: [_("ActivityType"), {content: "selectFilter"}], width: 150, sort: "text"},
				{id: "DueDate", header: [_("DueDate"), {content: "dateFilter"}], sort: "text", width: 100, format: webix.i18n.dateFormatStr},
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
		const activitiesTable = $$("activities:activitiesTable");
		const currentDate = new Date();
		const curDatePart = webix.Date.datePart(currentDate);


		switch (value) {
			case "all" : {
				activitiesTable.filter(() => true);
				activitiesTable.filterByAll();
				break;
			}
			case "overdue" : {
				activitiesTable.filter(obj => obj.DueDate < currentDate);
				break;
			}
			case "completed": {
				activitiesTable.filter(obj => obj.State === "Close");
				break;
			}
			case "today": {
				activitiesTable.filter(obj => webix.Date.equal(obj.DueDate, curDatePart));
				break;
			}
			case "tomorrow": {
				activitiesTable.filter(obj => obj.DueDate.getDay() === currentDate.getDay() + 1 &&
				obj.DueDate.getYear() === currentDate.getYear());
				break;
			}
			case "thisweek": {
				activitiesTable.filter(obj => webix.Date.equal(
					webix.Date.weekStart(obj.DueDate),
				 	webix.Date.weekStart(currentDate))
				);
				break;
			}
			case "thismonth": {
				activitiesTable.filter(obj => obj.DueDate.getMonth() === currentDate.getMonth() &&
				obj.DueDate.getYear() === currentDate.getYear());
				break;
			}
			default: {
				activitiesTable.filter(() => true);
				break;
			}
		}
	}
}


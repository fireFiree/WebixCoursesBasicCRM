import {JetView} from "webix-jet";
import {getContacts} from "models/contacts";
import {getTypes} from "models/activityTypes";
import {activityAction, getActivityItem} from "models/activities";

function contactName(obj) {
	let fullName = `${obj.FirstName} ${obj.LastName}`;
	if (fullName == " ") { return obj.Email; }

	return `${obj.FirstName} ${obj.LastName}`;
}

export default class WindowsView extends JetView {
	config() {
		const form = {
			// id: "form",
			view: "form",
			borderless: true,
			width: 400,
			elements: [
				{view: "textarea", label: "Details", name: "Details"},
				{view: "richselect",
					label: "Type",
					name: "TypeID",
					options: {
						body: {
							data: getTypes(),
							template: "#Value#"
						}
					}
				},
				{view: "richselect",
					label: "Contact",
					name: "ContactID",
					options: {
						body: {
							data: getContacts(),
							template: contactName
						}
					}},
				{view: "datepicker", label: "Date", timepicker: true, name: "DueDate", format: "%d-%m-%Y"},
				{view: "checkbox", label: " Completed", name: "State", checkValue: "Close", uncheckedValue: "Open"},
				{cols: [{},
					{view: "button", value: "Save", click: () => this.saveActivity()},
					{view: "button", value: "Cancel", click: () => this.closeWindow()}]}
			],
			rules: {
				TypeID: webix.rules.isNotEmpty,
				ContactID: webix.rules.isNotEmpty
			}
		};
		const popup = {id: "popup",
			view: "window",
			position: "center",
			modal: true,
			head: "Activity",
			body: form
		};

		return popup;
	}

	init() {}

	showWindow(id) {
		this.getRoot().show();
		let form = this.getRoot().queryView({view: "form"});
		form.clear();

		if (id !== undefined) {
			form.setValues(getActivityItem(id.row));
		}
	}

	saveActivity() {
		let form = this.getRoot().queryView({view: "form"});
		if (form.validate()) {
			let item = form.getValues();
			activityAction(item.id, item);
			this.getRoot().hide();
		}
	}

	closeWindow() {
		this.getRoot().hide();
	}
}

import {JetView} from "webix-jet";
import {contacts, getContactNameOrEmail} from "models/contacts";
import {types} from "models/activityTypes";
import {activities} from "models/activities";


export default class WindowsView extends JetView {
	config() {
		const form = {
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
							data: types,
							template: "#Value#"
						}
					}
				},
				{view: "richselect",
					label: "Contact",
					name: "ContactID",
					options: {
						body: {
							data: contacts,
							template: getContactNameOrEmail
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

	showWindow(id) {
		this.getRoot().show();
		let form = this.getRoot().queryView({view: "form"});
		form.clear();

		if (id !== undefined) {
			form.setValues(activities.getItem(id.row));
		}
	}

	saveActivity() {
		let form = this.getRoot().queryView({view: "form"});
		if (form.validate()) {
			let obj = form.getValues();
			if (obj.id === undefined) { activities.add(obj); }
			else { activities.updateItem(obj.id, obj); }
			this.getRoot().hide();
		}
	}

	closeWindow() {
		this.getRoot().hide();
	}
}

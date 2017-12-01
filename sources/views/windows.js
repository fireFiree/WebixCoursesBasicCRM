import {JetView} from "webix-jet";
import {contacts, getContactNameOrEmail} from "models/contacts";
import {types} from "models/activityTypes";
import {activities} from "models/activities";


export default class WindowsView extends JetView {
	config() {

		const _ = this.app.getService("locale")._;
		const form = {
			view: "form",
			id: "window:form",
			borderless: true,
			width: 400,
			elements: [
				{view: "textarea", label: _("Details"), name: "Details"},
				{view: "richselect",
					label: _("Type"),
					name: "TypeID",
					options: {
						body: {
							data: types,
							template: "#Value#"
						}
					}
				},
				{view: "richselect",
					label: _("Contact"),
					name: "ContactID",
					options: {
						body: {
							data: contacts,
							template: getContactNameOrEmail
						}
					}},
				{view: "datepicker", label: _("Date"), timepicker: true, name: "DueDate", format: "%d-%m-%Y"},
				{view: "checkbox", label: _("Completed"), name: "State", checkValue: "Close", uncheckedValue: "Open"},
				{cols: [{},
					{view: "button", value: _("Save"), click: () => this.saveActivity()},
					{view: "button", value: _("Cancel"), click: () => this.closeWindow()}]}
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
			head: _("Activity"),
			body: form
		};

		return popup;
	}

	showWindow(id) {
		this.getRoot().show();
		let form = $$("window:form");
		form.clear();

		if (id !== undefined) {
			form.setValues(activities.getItem(id.row));
		}
	}

	saveActivity() {
		let form = $$("window:form");
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

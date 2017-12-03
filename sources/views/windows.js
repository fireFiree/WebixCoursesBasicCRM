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
			elementsConfig: {
				labelWidth: 100
			},
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
					{view: "button", value: _("Save"), click: () => this.saveActivity(), btn: "save"},
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
			head: {view: "template", template: _("AddActivity"), type: "header"},
			body: form
		};

		return popup;
	}

	showWindow(id) {
		const _ = this.app.getService("locale")._;	
		this.getRoot().show();
		let form = $$("window:form");

		let popupHeader = $$("popup").queryView({type: "header"});

		if (id !== undefined) {
			popupHeader.define("template", _("EditActivity"));
			popupHeader.refresh();
			form.setValues(activities.getItem(id.row));
		}
		else {
			popupHeader.define("template", _("AddActivity"));
			popupHeader.refresh();
		}	
	}

	saveActivity() {
		let form = $$("window:form");
		if (form.validate()) {
			let obj = form.getValues();
			if (obj.id === undefined) { activities.add(obj); }
			else { activities.updateItem(obj.id, obj); }
			form.clear();
			form.clearValidation();
			this.getRoot().hide();
		}
	}

	closeWindow() {
		this.getRoot().hide();
	}
}

import {JetView} from "webix-jet";
import {contacts, getContactNameOrEmail} from "models/contacts";
import {types} from "models/activityTypes";
import {activities} from "models/activities";


export default class WindowsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const form = {
			view: "form",
			unq: "form",
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
				{view: "datepicker", label: _("Date"), timepicker: true, name: "DueDate", format: webix.i18n.dateFormatStr},
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
		const popup = {name: "popup",
			view: "window",
			position: "center",
			modal: true,
			head: {view: "template", template: _("AddActivity"), type: "header"},
			body: form,
			on: {
				onHide: () => {
					let frm = this.getRoot().queryView({unq: "form"});
					frm.clear();
					frm.clearValidation();
				}
			}
		};

		return popup;
	}

	showWindow(id, contact) {
		const _ = this.app.getService("locale")._;
		let form = this.getRoot().queryView({unq: "form"});
		let popupHeader = this.getRoot().queryView({type: "header"});
		let newId = id || contacts.getCursor();
		if (contact) {
			form.elements.ContactID.setValue(newId);
			form.elements.ContactID.disable();
		}
		this.getRoot().show();
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
		let form = this.getRoot().queryView({unq: "form"});
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

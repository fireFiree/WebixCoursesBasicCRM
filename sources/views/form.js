import {JetView} from "webix-jet";
import {contacts, getContactNameOrEmail} from "models/contacts";
import {types} from "models/activityTypes";
import {activities} from "models/activities";
import {statuses} from "models/statuses";

export default class FormView extends JetView {
	config() {

		const _ = this.app.getService("locale")._;
		const header = {view: "label", label: _("SaveContact"), css: "bigText"};

		const form = {
			view: "form",
			id: "form:form",
			borderless: true,
			cols: [
				{rows: [
					{view: "text", label: _("FirstName"), name: "FirstName"},
					{view: "text", label: _("LastName"), name: "LastName"},
					{view: "datepicker", label: _("StartDate"), stringResult: true, timepicker: true, name: "StartDate", format: "%d-%m-%Y"},
					{view: "richselect",
						label: _("Status"),
						name: "StatusID",
						options: {
							body: {
								data: types,
								template: "#Icon#"
							}
						}
					},
					{view: "text", label: _("Job"), name: "Job"},
					{view: "text", label: _("Company"), name: "Company"},
					{view: "text", label: _("Website"), name: "Website"},
					{view: "textarea", label: _("Address"), name: "Address"}
				]},
				{rows: [
					{view: "text", label: "Email", name: "Email"},
					{view: "text", label: "Skype", name: "Skype"},
					{view: "text", label: _("Phone"), name: "Phone"},
					{view: "datepicker", label: _("BirthDay"), name: "Birthday", stringResult: true, format: "%d-%m-%Y"}
				]}
			],
			rules: {
				TypeID: webix.rules.isNotEmpty
			}
		};
		const saveBtn = {view: "button",
			label: _("SaveContact"),
			type: "iconButton",
			icon: "plus-square",
			click: () => {
				let item = $$("form:form").getValues();
				if (item.id === undefined) {
					let id = contacts.getLastId() + 1;
					item.id = id;
					contacts.add(item);
				}
				else {
					contacts.updateItem(item.id, item);
					$$("form:form").clear();
				}
				this.show(`./../card?id=${item.id}`);
			}
		};

		const cancelBtn = {view: "button",
			label: _("Cancel"),
			type: "iconButton",
			icon: "ban",
			click: () => {
				let id = contacts.getCursor() || contacts.getFirstId();

				this.show(`./../card?id=${id}`);
			}
		};

		const footer = {cols: [{}, saveBtn, cancelBtn]};

		return {rows: [header, form, footer, {}]};
	}
	init(view, url) {
		if (url[0].params.id) {
			$$("form:form").clear();
		}
	}
	urlChange(view, url) {
		let id = url[0].params.id;
		if (id) {
			$$("form:form").setValues(contacts.getItem(id));
		}
	}
}

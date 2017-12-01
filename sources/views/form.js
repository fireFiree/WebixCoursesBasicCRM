import {JetView} from "webix-jet";
import {contacts, getContactNameOrEmail} from "models/contacts";
import {types} from "models/activityTypes";
import {activities} from "models/activities";
import {statuses} from "models/statuses";

export default class FormView extends JetView {
	config() {
		const header = {view: "label", label: " Save Contact", css: "bigText"};

		const form = {
			view: "form",
			id: "form:form",
			borderless: true,
			cols: [
				{rows: [
					{view: "text", label: "First Name", name: "FirstName"},
					{view: "text", label: "last Name", name: "LastName"},
					{view: "datepicker", label: "Joining Date", stringResult: true, timepicker: true, name: "StartDate", format: "%d-%m-%Y"},
					{view: "richselect",
						label: "Status",
						name: "StatusID",
						options: {
							body: {
								data: types,
								template: "#Icon#"
							}
						}
					},
					{view: "text", label: "Job", name: "Job"},
					{view: "text", label: "Company", name: "Company"},
					{view: "text", label: "Website", name: "Website"},
					{view: "textarea", label: "Address", name: "Address"}
				]},
				{rows: [
					{view: "text", label: "Email", name: "Email"},
					{view: "text", label: "Skype", name: "Skype"},
					{view: "text", label: "Phone", name: "Phone"},
					{view: "datepicker", label: "Birthday", name: "Birthday", stringResult: true, format: "%d-%m-%Y"}
				]}
			],
			rules: {
				TypeID: webix.rules.isNotEmpty
			}
		};
		const saveBtn = {view: "button",
			label: "Save Contact",
			type: "iconButton",
			icon: "plus-square",
			click: () => {
				let item = $$("form:form").getValues();
				if (contacts.getCursor() === null) {
					let id = contacts.getLastId() + 1;
					item.id = id;
					contacts.add(item);
				}
				else {
					contacts.updateItem(item.id, item);
					$$("form:form").clear();
				}
				this.show(`../card?id=${item.id}`);
			}
		};

		const cancelBtn = {view: "button",
			label: "Cancel",
			type: "iconButton",
			icon: "ban",
			click: () => {
				let id = contacts.getCursor() || contacts.getFirstId();

				this.show(`../card?id=${id}`);
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

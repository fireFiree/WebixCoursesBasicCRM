import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import WindowsView from "views/windows";
import {getTypeOptions} from "models/activityTypes";

function contactListFilter(obj, value) {
	let filter = false;
	for (let prop in obj) {
		if (obj[prop].toString().toLowerCase().indexOf(value) != -1) { filter = true; }
	}

	return filter;
}

export default class ContactsView extends JetView {
	config() {
		function listTemplate(obj) {
			return `<img src='${obj.Photo}' class='round'/><div class='shortDescription'><b>${obj.FirstName} ${obj.LastName}</b><br/>${obj.Email}</div>`;
		}

		const _ = this.app.getService("locale")._;

		const addBtn = {view: "button",
			label: _("AddContact"),
			type: "iconButton",
			icon: "plus-square",
			click: () => {
				this.show("./form");
			}
		};

		let search = {view: "text",
			placeholder: _("SearchContact"),
			on: {
				onTimedKeyPress() {
					let value = this.getValue().toLowerCase();
					$$("contactsList").filter(obj => contactListFilter(obj, value));
				}
			}};
		let contactsList = {view: "list",
			id: "contactsList",
			borderless: true,
			template: listTemplate,
			width: 300,
			type: {height: 70},
			select: true,
			on: {
				onSelectChange: (id) => {
					contacts.setCursor(id);
					this.show(`./card?id=${id}`);
				},
				onAfterFilter: () => {
					let id = $$("contactsList").getFirstId();
					$$("contactsList").select(id);
				}
			}
		};

		const ui = {cols: [
			{rows: [search, contactsList, addBtn]}, {$subview: true}]};

		return ui;
	}
	init(view, url) {
		const list = $$("contactsList");
		contacts.waitData.then(() => {
			list.parse(contacts);
			let id = list.getFirstId();

			if (url[1]) { id = url[1].params.id; }

			if (list.exists(id)) {
				list.select(id);
			}
		});
	}

	urlChange(view, url) {
		const list = $$("contactsList");
		let id = list.getFirstId();

		if (url[1]) { id = url[1].params.id; }

		if (list.exists(id)) {
			list.select(id);
		}
	}
}


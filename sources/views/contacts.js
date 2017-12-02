import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import WindowsView from "views/windows";
import {getTypeOptions} from "models/activityTypes";



export default class ContactsView extends JetView {
	config() {
		function contactListFilter(obj, value) {
			let filter = false;
			for (let prop in obj) {
				if (typeof obj[prop] === "string") {
					if (obj[prop].toLowerCase().indexOf(value) == 0) { filter = true; }
				}
				else if (typeof obj[prop] === "number") {
					if (`${obj[prop]}`.toLowerCase().indexOf(value) == 0) { filter = true; }
				}
			}

			return filter;
		}

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

		let ui = {cols: [
			{rows: [search, contactsList, addBtn]}, {$subview: true}]};

		return ui;
	}
	init(view, url) {
		let list = $$("contactsList");
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
		let list = $$("contactsList");
		let id = list.getFirstId();

		if (url[1]) { id = url[1].params.id; }

		if (list.exists(id)) {
			list.select(id);
		}
	}
}


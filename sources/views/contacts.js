import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import WindowsView from "views/windows";
import {getTypeOptions} from "models/activityTypes";


export default class ContactsView extends JetView {
	config() {
		function listTemplate(obj) {
			return `<img src='${obj.Photo}' class='round'/><div class='shortDescription'><b>${obj.FirstName} ${obj.LastName}</b><br/>${obj.Email}</div>`;
		}

		const addBtn = {view: "button",
			label: "Add Contact",
			type: "iconButton",
			icon: "plus-square",
			click: () => {
				this.show("./form");
			}
		};


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
				}
			}
		};

		let ui = {cols: [
			{rows: [contactsList, addBtn]}, {$subview: true}]};

		return ui;
	}
	init(view, url) {
		let list = $$("contactsList");
		debugger;
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


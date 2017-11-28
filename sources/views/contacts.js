import {JetView} from "webix-jet";
import {contacts} from "models/contacts";


export default class ContactsView extends JetView {
	config() {
		function listTemplate(obj) {
			return `<img src='${obj.Photo}' class='round'/><div class='shortDescription'><b>${obj.FirstName} ${obj.LastName}</b><br/>${obj.Email}</div>`;
		}
		const addBtn = {view: "button",
			label: "Add Contact",
			type: "iconButton",
			icon: "plus-square"

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
					this.show(`./card?id=${id}`);
				}
			}
		};

		let ui = {cols: [
			{rows: [contactsList, addBtn]}, {$subview: true}]};

		return ui;
	}
	init() {
		let list = $$("contactsList");
		list.parse(contacts);

		contacts.waitData.then(() => {
			list.select(list.getFirstId());
		});
	}
}

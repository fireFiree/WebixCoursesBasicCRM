import {JetView} from "webix-jet";
import {getContacts} from "models/contacts";


export default class ContactsView extends JetView {
	config() {
		function listTemplate(obj) {
			return `<img src='${ obj.Photo}' class='round'/><div class='shortDescription'><b>${ obj.FirstName} ${ obj.LastName}</b><br/>${obj.Email}</div>`;
		}

		let contactsList = {view: "list",
			id: "contactsList",
			borderless: true,
			template: listTemplate,
			width: 300,
			type: {height: 70},
			select: true,
			on: {
				onSelectChange: (id) => {
					this.show(`./card?id=${ id}`);
				}
			}
		};

		let ui = {cols: [contactsList, {$subview: true}]};

		return ui;
	}
	init(view) {
		let list = view.queryView({view: "list"});
		list.parse(getContacts());

		getContacts().waitData.then(() => {
			list.select( list.getFirstId());
		});
	}
}

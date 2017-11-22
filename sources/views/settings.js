import {JetView} from "webix-jet";

export default class SettingsView extends JetView{
	config(){

		var header = { view:"label", label:"Settings", css:"center"};
		
		var settings = { view:"select", label:"Language", options:["English", "Русский"]};

		var ui = { rows:[ header, settings, {}]};

		return ui;
	}

	init(view){
		//view.parse(data);
	}
}
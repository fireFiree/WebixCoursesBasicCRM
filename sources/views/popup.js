import { JetView } from "webix-jet";
import {getContactOptions} from "models/contacts";
import {getTypeOptions} from "models/activityTypes";


export function openPopUp(){

	webix.ui(popUp).show();
}

function closePopUp(){
	this.getTopParentView().hide();
}

var form = {
	view:"form",
	borderless:true,
	width: 400,
	elements: [
		{ view:"textarea", label:"Details", name:"Details" },
		{ view:"richselect", label:"Type", name:"TypeID", options: { 
			body: { 
				data: getTypeOptions(),
				template: "#value#"
			}
		}
		},
		{ view:"richselect", label: "Contact", name:"ContactID", options:{ 
			body: { 
				data: getContactOptions(), 
				template: "#value#"
			}
		}},
		{ view:"datepicker", label: "Date",  timepicker: true, name: "DueDate"},
		{ view:"checkbox", label:" Completed", name: "Completed"},
		{ view:"button", value: "Cancel", click: closePopUp }
	]
};

var popUp = { id:"popup", 
	view:"window", 
	position:"center",
	modal:true,
	head:"Add Activity",
	body:form
};



export default class PopupView extends JetView{
	config(){    
		return popUp;
	}
	init(){

	}
}
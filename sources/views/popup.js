import { JetView } from "webix-jet";
import {getContactOptions} from "models/contacts";
import {getTypeOptions} from "models/activityTypes";
import {activityAction, getActivityItem} from "models/activities";

export function openPopUp(id){

	webix.ui(popUp).show();

	if( id !== undefined){
		$$("form").setValues(getActivityItem(id));
	}
}

function closePopUp(){
	this.getTopParentView().hide();
}

function saveForm(){
	var form = $$("form");
	if( form.validate()){
		var item = form.getValues();
		activityAction(item.id, item);
		this.getTopParentView().hide();
	}
}

var form = {
	id: "form",
	view:"form",
	borderless:true,
	width: 400,
	elements: [
		{ view:"textarea", label:"Details", name:"Details" },
		{ view:"richselect", label:"Type", name:"TypeID", options: { 
			body: { 
				data: getTypeOptions()
			}
		}
		},
		{ view:"richselect", label: "Contact", name:"ContactID", options:{ 
			body: { 
				data: getContactOptions()
			}
		}},
		{ view:"datepicker", label: "Date",  timepicker: true, name: "DueDate", format: "%d %m %Y"},
		{ view:"checkbox", label:" Completed", name: "State", checkValue:"Close", uncheckedValue:"Open"},
		{ cols:[ {}, 
			{ view:"button", value: "Save", click: saveForm },
			{ view:"button", value: "Cancel", click: closePopUp }]}	
	],
	rules: {
		TypeID: webix.rules.isNotEmpty,
		ContactID: webix.rules.isNotEmpty
	}
};

var popUp = { id:"popup", 
	view:"window", 
	position:"center",
	modal:true,
	head:"Activity",
	body:form
};

export default class PopupView extends JetView{
	config(){    
		return popUp;
	}
	init(){

	}
}
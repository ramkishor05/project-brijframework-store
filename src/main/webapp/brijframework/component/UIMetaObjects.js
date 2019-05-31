	function UIField(metaData){
		this.id							=metaData.id;
    	this.name						=metaData.name;
    	this.type						=metaData.type;
    	this.value						=metaData.value;
    	this.label						=metaData.label;
		this.object 					=metaData.object
		this.objectParam				=metaData.objectParam;
		this.classID					=metaData.classID;
    	this.beanID						=metaData.beanID;
    	this.uniqueID					=metaData.uniqueID;
    	this.uniqueKey					=metaData.uniqueKey;
    	this.typeID						=metaData.typeID;
    	this.helpText					=metaData.helpText;
    	this.description				=metaData.description;
    	this.placeholder				=metaData.placeholder;
    	this.size						=metaData.size;
    	this.maxlength					=metaData.maxlength;
    	this.minlength					=metaData.minlength;
    	this.src						=metaData.src;
    	this.alt						=metaData.alt;
    	this.pattern					=metaData.pattern;
    	this.min						=metaData.min;
    	this.max						=metaData.max;
    	this.height						=metaData.height;
    	this.width						=metaData.width;
    	this.step						=metaData.step;
    	this.isImmedate					=metaData.isImmedate;
    	this.isRequired					=metaData.isRequired;
    	this.isReadonly					=metaData.isReadonly;
    	this.isDisabled					=metaData.isDisabled;
    	this.isAutocomplete				=metaData.isAutocomplete;
    	this.isAutofocus				=metaData.isAutofocus;
    	this.isFormnovalidate			=metaData.isFormnovalidate;
    	this.isMultiple					=metaData.isMultiple;
    	this.headerLabel				=metaData.headerLabel
	}
	
	function UIRelField(metaData){
		this.id							=metaData.id;
    	this.name						=metaData.name;
    	this.type						=metaData.type;
    	this.value						=metaData.value;
    	this.label						=metaData.label;
		this.object 					=metaData.object
		this.objectParam				=metaData.objectParam;
		this.classID					=metaData.classID;
    	this.beanID						=metaData.beanID;
    	this.uniqueID					=metaData.uniqueID;
    	this.uniqueKey					=metaData.uniqueKey;
    	this.typeID						=metaData.typeID;
    	this.fieldIDs					=metaData.fieldIDs;
    	this.relBeanID					=metaData.relBeanID;
    	this.relClassID					=metaData.relClassID;
    	this.displayKey					=metaData.displayKey;
	}

   function UITable(metaData){
		this.classID					=metaData.classID;
    	this.beanID						=metaData.beanID;
    	this.uniqueID					=metaData.uniqueID;
    	this.uniqueKey					=metaData.uniqueKey;
    	this.id							=metaData.id;
    	this.name						=metaData.name;
    	this.type						=metaData.type;
    	this.typeID						=metaData.typeID;
    	this.value						=metaData.value;
    	this.label						=metaData.label;
    	this.helpText					=metaData.helpText;
    	this.description				=metaData.description;
    	this.placeholder				=metaData.placeholder;
    	this.size						=metaData.size;
    	this.maxlength					=metaData.maxlength;
    	this.minlength					=metaData.minlength;
    	this.src						=metaData.src;
    	this.alt						=metaData.alt;
    	this.pattern					=metaData.pattern;
    	this.min						=metaData.min;
    	this.max						=metaData.max;
    	this.height						=metaData.height;
    	this.width						=metaData.width;
    	this.step						=metaData.step;
    	this.isImmedate					=metaData.isImmedate;
    	this.isRequired					=metaData.isRequired;
    	this.isReadonly					=metaData.isReadonly;
    	this.isDisabled					=metaData.isDisabled;
    	this.isAutocomplete				=metaData.isAutocomplete;
    	this.isAutofocus				=metaData.isAutofocus;
    	this.isFormnovalidate			=metaData.isFormnovalidate;
    	this.isMultiple					=metaData.isMultiple;
    	this.addFieldArray				=[];
    	this.relFieldArray				=[];
    	this.mdlFieldArray				=[];
    	this.labelArray					=[];
    	this.rowFieldArray				=[];
    	
    	if(metaData.rowFieldArray!=undefined || metaData.rowFieldArray!=null){
	    	for(var a in metaData.rowFieldArray){
				this.rowFieldArray.push(new UIField(metaData.rowFieldArray[a]));
			}
    	}
    	if(metaData.addFieldArray!=undefined || metaData.addFieldArray!=null){
	    	for(var a in metaData.addFieldArray){
				this.addFieldArray.push(new UIField(metaData.addFieldArray[a]));
			}
    	}
    	if(metaData.relFieldArray!=undefined || metaData.relFieldArray!=null){
			for(var a in metaData.relFieldArray){
				this.relFieldArray.push(new UIRelField(metaData.relFieldArray[a]));
			}
    	}
		if(metaData.mdlFieldArray!=undefined || metaData.mdlFieldArray!=null){
			for(var a in metaData.mdlFieldArray){
				this.mdlFieldArray.push(new UIField(metaData.mdlFieldArray[a]));
			}
		}
	}
	

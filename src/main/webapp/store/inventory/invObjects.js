function UIUnit(unit){
	this.uniqueID					=unit.uniqueID;
	this.typeID				    	=unit.typeID;
	this.shortDesc					=unit.shortDesc;
	this.longDesc			    	=unit.longDesc;
	this.friendlyName				=unit.friendlyName;
}

function UIUnitGroup(unitGroup){
	this.uniqueID					=unitGroup.uniqueID;
	this.typeID				    	=unitGroup.typeID;
	this.shortDesc					=unitGroup.shortDesc;
	this.longDesc			    	=unitGroup.longDesc;
	this.friendlyName				=unitGroup.friendlyName;
	this.unitList				    =[];
	for(var unit in unitGroup.unitArray){
		this.unitList.push(new UIUnit(unitGroup.unitArray[unit]))
	}
}


function UICategory(uiCategory){
	this.uniqueID					=uiCategory.uniqueID;
	this.categoryID					=uiCategory.categoryID;
	this.name						=uiCategory.name;
	this.description				=uiCategory.description;
	this.typeID						=uiCategory.typeID;
	this.categoryGroup				=uiCategory.categoryGroup;
	this.eoCategoryGroup			=uiCategory.eoCategoryGroup;
}

function UICategoryGroup(uiCategoryGroup){
	this.uniqueID					=uiCategoryGroup.uniqueID;
	this.categoryID					=uiCategoryGroup.categoryID;
	this.name						=uiCategoryGroup.name;
	this.description				=uiCategoryGroup.description;
	this.typeID						=uiCategoryGroup.typeID;
}

function UIPrep(eoPrep){
	this.uniqueID					=eoPrep.uniqueID;
	this.idenNo					    =eoPrep.idenNo;
	this.name						=eoPrep.name;
	this.description				=eoPrep.description;
	this.qnt						=eoPrep.qnt;
	this.logoUrl					=eoPrep.logoUrl
}

function UIIngr(eoIngr){
	this.uniqueID					=eoIngr.uniqueID;
	this.idenNo					    =eoIngr.idenNo;
	this.name						=eoIngr.name;
	this.description				=eoIngr.description;
	this.logoUrl					=eoIngr.logoUrl
}
function UIFreq(countFreq){
	this.uniqueID					=countFreq.uniqueID;
	this.typeID					    =countFreq.typeID;
	this.name						=countFreq.name;
	this.description				=countFreq.description;
	this.isActive					=countFreq.isActive;
	this.displayOrder				=countFreq.displayOrder
}

function UIIngrFreq(countFreq){
	this.uniqueID					=countFreq.uniqueID;
	this.typeID					    =countFreq.typeID;
	this.name						=countFreq.name;
	this.description				=countFreq.description;
	this.isActive					=countFreq.isActive;
	this.displayOrder				=countFreq.displayOrder
	this.eoIngr						=countFreq.eoIngr;
	this.eoCountFreq				=countFreq.eoCountFreq;
}

function UIPrepFreq(countFreq){
	this.uniqueID					=countFreq.uniqueID;
	this.typeID					    =countFreq.typeID;
	this.name						=countFreq.name;
	this.description				=countFreq.description;
	this.isActive					=countFreq.isActive;
	this.displayOrder				=countFreq.displayOrder
	this.eoPrep						=countFreq.eoPrep;
	this.eoCountFreq				=countFreq.eoCountFreq;
}

function UIProdFreq(countFreq){
	this.uniqueID					=countFreq.uniqueID;
	this.typeID					    =countFreq.typeID;
	this.name						=countFreq.name;
	this.description				=countFreq.description;
	this.isActive					=countFreq.isActive;
	this.displayOrder				=countFreq.displayOrder
	this.eoProd						=countFreq.eoProd;
	this.eoCountFreq				=countFreq.eoCountFreq;
}

function UIProduct(eoIngr){
	this.uniqueID					=eoIngr.uniqueID;
	this.idenNo					    =eoIngr.idenNo;
	this.name						=eoIngr.name;
	this.description				=eoIngr.description;
	this.logoUrl					=eoIngr.logoUrl
}

function UILocation(eoLoc){
	this.uniqueID					=eoLoc.uniqueID;
	this.idenNo					    =eoLoc.idenNo;
	this.name						=eoLoc.name;
	this.description				=eoLoc.description;
	this.logoUrl					=eoLoc.logoUrl
}

function UIIngrLocation(eoLoc){
	this.uniqueID					=eoLoc.uniqueID;
	this.idenNo					    =eoLoc.idenNo;
	this.name						=eoLoc.name;
	this.description				=eoLoc.description;
	this.eoIngr						=eoLoc.eoIngr;
	this.eoLocation				    =eoLoc.eoLocation;
}

function UIPrepLocation(eoLoc){
	this.uniqueID					=eoLoc.uniqueID;
	this.idenNo					    =eoLoc.idenNo;
	this.name						=eoLoc.name;
	this.description				=eoLoc.description;
	this.logoUrl					=eoLoc.logoUrl;
	this.eoLocation					=eoLoc.eoLocation;
	this.eoPrep  				    =eoLoc.eoPrep;
}

function UIProdLocation(eoLoc){
	this.uniqueID					=eoLoc.uniqueID;
	this.idenNo					    =eoLoc.idenNo;
	this.name						=eoLoc.name;
	this.description				=eoLoc.description;
	this.logoUrl					=eoLoc.logoUrl;
	this.eoLocation					=eoLoc.eoLocation;
	this.eoProd  				    =eoLoc.eoProd;
}

function UIStorage(eoLoc){
	this.uniqueID					=eoLoc.uniqueID;
	this.id  					    =eoLoc.id;
	this.name						=eoLoc.name;
	this.displayOrder				=eoLoc.displayOrder;
	this.locationList				=[];
	if(eoLoc.locationList!=null){
		for(var l in eoLoc.locationList){
			this.locationList.push(new UILocation(eoLoc.locationList[l]));
		}
	}
}

function UIIngrDetail(eoIngr){
	this.uniqueID				    =eoIngr!=null ? eoIngr.uniqueID 	: "";
	this.idenNo					    =eoIngr!=null ? eoIngr.idenNo   	: "";
	this.name						=eoIngr!=null ? eoIngr.name			: "";
	this.description				=eoIngr!=null ? eoIngr.description  : "";
	this.logoUrl					=eoIngr!=null ? eoIngr.logoUrl		: "";
	this.eoIngrLocationArray		=[];
	if(eoIngr!=null && eoIngr.eoIngrLocationArray!=null){
		for(var loc in eoIngr.eoIngrLocationArray){
			this.eoIngrLocationArray.push(new UIIngrLocation(eoIngr.eoIngrLocationArray[loc]))
		}
	}
	this.eoIngrCountFreqArray		=[];
	if(eoIngr!=null && eoIngr.eoIngrCountFreqArray!=null){
		for(var loc in eoIngr.eoIngrCountFreqArray){
			this.eoIngrCountFreqArray.push(new UIIngrFreq(eoIngr.eoIngrCountFreqArray[loc]))
		}
	}
	this.removeKey=function(object){
		var uniqueID=0;
		if(object['uniqueID_ADD']!=null){
			uniqueID=object['uniqueID_ADD']
			delete object['uniqueID_ADD']
		}else if(object['uniqueID_UPDATE']!=null){
			uniqueID=object['uniqueID_UPDATE']
			delete object['uniqueID_UPDATE']
		}else if(object['uniqueID_ASSIGN']!=null){
			uniqueID=object['uniqueID_ASSIGN']
			delete object['uniqueID_ASSIGN']
		}else if(object['uniqueID_UPDATE']!=null){
			uniqueID=object['uniqueID_UPDATE']
			delete object['uniqueID_UPDATE']
		}else{
			delete object['uniqueID']
			uniqueID=object['uniqueID']
		}
		object['uniqueID_DELETE']=uniqueID;
		return object;
	}
	
	this.addKey=function(object){
		var uniqueID=0;
		if(object['uniqueID_DELETE']!=null){
			uniqueID=object['uniqueID_DELETE']
			delete object['uniqueID_DELETE']
		}else if(object['uniqueID_UPDATE']!=null){
			uniqueID=object['uniqueID_UPDATE']
			delete object['uniqueID_UPDATE']
		}else if(object['uniqueID_ASSIGN']!=null){
			uniqueID=object['uniqueID_ASSIGN']
			delete object['uniqueID_ASSIGN']
		}else if(object['uniqueID_MARGE']!=null){
			uniqueID=object['uniqueID_MARGE']
			delete object['uniqueID_MARGE']
		}else{
			delete object['uniqueID']
			uniqueID=object['uniqueID']
		}
		object['uniqueID_ADD']=0;
		return object;
	}
	this.updateKey=function(object){
		var uniqueID=0;
		if(object['uniqueID_DELETE']!=null){
			uniqueID=object['uniqueID_DELETE']
			delete object['uniqueID_DELETE']
		}else if(object['uniqueID_ADD']!=null){
			uniqueID=object['uniqueID_ADD']
			delete object['uniqueID_ADD']
		}else if(object['uniqueID_ASSIGN']!=null){
			uniqueID=object['uniqueID_ASSIGN']
			delete object['uniqueID_ASSIGN']
		}else if(object['uniqueID_MARGE']!=null){
			uniqueID=object['uniqueID_MARGE']
			delete object['uniqueID_MARGE']
		}else{
			delete object['uniqueID']
			uniqueID=object['uniqueID']
		}
		object['uniqueID_UPDATE']=uniqueID;
		return object;
	}
	this.assignKey=function(object){
		var uniqueID=0;
		if(object['uniqueID_DELETE']!=null){
			uniqueID=object['uniqueID_DELETE']
			delete object['uniqueID_DELETE']
		}else if(object['uniqueID_ADD']!=null){
			uniqueID=object['uniqueID_ADD']
			delete object['uniqueID_ADD']
		}else if(object['uniqueID_UPDATE']!=null){
			uniqueID=object['uniqueID_UPDATE']
			delete object['uniqueID_UPDATE']
		}else if(object['uniqueID_MARGE']!=null){
			uniqueID=object['uniqueID_MARGE']
			delete object['uniqueID_MARGE']
		}else{
			delete object['uniqueID']
			uniqueID=object['uniqueID']
		}
		object['uniqueID_ASSIGN']=uniqueID;
		return object;
	}
	this.margeKey=function(object){
		var uniqueID=0;
		if(object['uniqueID_DELETE']!=null){
			uniqueID=object['uniqueID_DELETE']
			delete object['uniqueID_DELETE']
		}else if(object['uniqueID_ADD']!=null){
			uniqueID=object['uniqueID_ADD']
			delete object['uniqueID_ADD']
		}else if(object['uniqueID_UPDATE']!=null){
			uniqueID=object['uniqueID_UPDATE']
			delete object['uniqueID_UPDATE']
		}else if(object['uniqueID_ASSIGN']!=null){
			uniqueID=object['uniqueID_ASSIGN']
			delete object['uniqueID_ASSIGN']
		}else{
			delete object['uniqueID']
			uniqueID=object['uniqueID']
		}
		object['uniqueID_MARGE']=uniqueID;
		return object;
	}
	this.addLocation=function (eolocation){
		var isAdded=false;
		for(var ingrloc in this.eoIngrLocationArray){
			if(this.eoIngrLocationArray[ingrloc]!=null && this.eoIngrLocationArray[ingrloc].eoLocation==eolocation.uniqueID){
				isAdded=true;
			}
		}
		if(!isAdded){
			eolocation['eoLocation']=eolocation.uniqueID;
			eolocation['eoIngr']=this.uniqueID;
			eolocation=this.addKey(eolocation);
			this.eoIngrLocationArray.push(new UIIngrLocation(eolocation))
		}
	};
	
	this.removeLocation=function (eolocation){
		for(var ingrloc in this.eoIngrLocationArray){
			if(this.eoIngrLocationArray[ingrloc]!=null && this.eoIngrLocationArray[ingrloc].eoLocation==eolocation.uniqueID){
				this.eoIngrLocationArray[ingrloc]=this.removeKey(this.eoIngrLocationArray[ingrloc]);
			}
		}
	};
	
	this.addFreq=function (eoFreq){
		var isAdded=false;
		for(var ingrFreq in this.eoIngrCountFreqArray){
			if(this.eoIngrCountFreqArray[ingrFreq]!=null && this.eoIngrCountFreqArray[ingrFreq].eoCountFreq==eoFreq.uniqueID){
				isAdded=true;
			}
		}
		if(!isAdded){
			eoFreq['eoCountFreq']=eoFreq.uniqueID;
			eoFreq['eoIngr']=this.uniqueID;
			eoFreq=this.addKey(new UIIngrFreq(eoFreq));
			this.eoIngrCountFreqArray.push(eoFreq)
		}
	};
	
	this.removeFreq=function (eoFreq){
		for(var ingrFreq in this.eoIngrCountFreqArray){
			if(this.eoIngrCountFreqArray[ingrFreq]!=null && this.eoIngrCountFreqArray[ingrFreq].eoCountFreq==eoFreq.uniqueID){
				this.eoIngrCountFreqArray[ingrFreq]=this.removeKey(	this.eoIngrCountFreqArray[ingrFreq] );
			}
		}
	};
	
	this.bulidObject=function (){
		for(var ingrFreq in this.eoIngrCountFreqArray){
			delete this.eoIngrCountFreqArray[ingrFreq].uniqueID;
			delete this.eoIngrCountFreqArray[ingrFreq].typeID;
			delete this.eoIngrCountFreqArray[ingrFreq].name;
			delete this.eoIngrCountFreqArray[ingrFreq].description;
			delete this.eoIngrCountFreqArray[ingrFreq].isActive;
			delete this.eoIngrCountFreqArray[ingrFreq].displayOrder			
		}
		for(var loc in this.eoIngrLocationArray){
			delete this.eoIngrLocationArray[loc].uniqueID;
			delete this.eoIngrLocationArray[loc].idenNo;
			delete this.eoIngrLocationArray[loc].name;
			delete this.eoIngrLocationArray[loc].description;
		}
	}
	

}

function UIPrepDetail(eoPrep){
	this.uniqueID				    =eoPrep!=null ? eoPrep.uniqueID 	: "";
	this.idenNo					    =eoPrep!=null ? eoPrep.idenNo   	: "";
	this.name						=eoPrep!=null ? eoPrep.name			: "";
	this.description				=eoPrep!=null ? eoPrep.description  : "";
	this.logoUrl					=eoPrep!=null ? eoPrep.logoUrl		: "";
	this.eoPrepLocationArray		=[];
	if(eoPrep!=null && eoPrep.eoPrepLocationArray!=null){
		for(var loc in eoPrep.eoPrepLocationArray){
			this.eoPrepLocationArray.push(new UIPrepLocation(eoPrep.eoPrepLocationArray[loc]))
		}
	}
	this.eoPrepCountFreqArray		=[];
	if(eoPrep!=null && eoPrep.eoPrepCountFreqArray!=null){
		for(var loc in eoPrep.eoPrepCountFreqArray){
			this.eoPrepCountFreqArray.push(new UIPrepFreq(eoPrep.eoPrepCountFreqArray[loc]))
		}
	}
}





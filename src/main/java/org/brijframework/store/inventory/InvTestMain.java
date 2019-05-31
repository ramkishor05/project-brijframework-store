package org.brijframework.store.inventory;

import org.brijframework.beans.collection.MapBean;
import org.brijframework.db.processor.DBDataProcessor;

public class InvTestMain {
	public static void main(String[] args) {
		MapBean<String, Object> map = new MapBean<>("uniqueID~name~idenNo~isActive~eoCategory",468,"buns","1212",false,75);
//		ListBean<Map<String,Object>> countFreq=new ListBean<>();
//		countFreq.add(new MapBean<>("uniqueID_ADD~eoCountFreq~isActive",0,46,false));
//		countFreq.add(new MapBean<>("uniqueID_UPDATE~eoCountFreq~isActive",515,46,false));
//		map.put("eoIngrCountFreqArray",countFreq );
		EOInvApp eoInvApp = DBDataProcessor.getProcessor().findObject(EOInvApp.class, "uniqueID", 45);
		System.out.println("eoInvApp="+eoInvApp);
		EOIngr eoIngr=DBDataProcessor.getProcessor().findObject(EOIngr.class, "uniqueID", 531);
		System.out.println("eoIngr="+eoIngr);
		//eoInvApp.updateToRel("eoIngrArray", map);
	}
}

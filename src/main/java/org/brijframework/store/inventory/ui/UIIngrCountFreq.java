package org.brijframework.store.inventory.ui;

import org.brijframework.atn.bean.Graph;
import org.brijframework.store.inventory.EOCountFreq;
import org.brijframework.store.inventory.EOIngrCountFreq;

@Graph
public class UIIngrCountFreq extends UICountFreq{
	private static final long serialVersionUID = 1L;

	public long eoIngr;
	public long eoCountFreq;

	public UIIngrCountFreq(EOCountFreq eoCountFreq) {
		super(eoCountFreq);
	}
	
	public void setIngr(EOIngrCountFreq countFreq) {
		this.uniqueID=countFreq.uniqueID;
		this.eoIngr=countFreq.eoIngr.uniqueID;
		this.eoCountFreq=countFreq.eoCountFreq.uniqueID;
	}
}



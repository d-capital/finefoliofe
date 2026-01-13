import { Component, ContentChildren, QueryList, AfterContentInit, Optional, Host } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { NgFor } from '@angular/common';
import { ValuateComponent } from '../valuate/valuate.component';
@Component({
  selector: 'app-tabs',
  imports: [NgFor],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  constructor(@Optional() @Host() private parent: ValuateComponent) {}

  ngAfterContentInit() {
    // Активируем первую вкладку по умолчанию
    const activeTabs = this.tabs.filter(tab => tab.active);
    
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(selectedTab: TabComponent) {
    // Снимаем активность со всех вкладок
    this.tabs.forEach(tab => {
      tab.active = false;
    });
    
    // Активируем выбранную вкладку
    selectedTab.active = true;
    if(selectedTab.name === "dcf_valuation"){
       this.parent.getDcfValuation();
    }
  }
}

export type PageId = 'home' | 'product' | 'craft' | 'experience' | 'shop';

export type CaseOption = 'titanium' | 'ceramic' | 'obsidian';
export type FinishOption = 'brushed' | 'polished' | 'matte';
export type StrapOption = 'graphite' | 'ivory' | 'carbon';

export interface ProductConfiguration {
  caseMaterial: CaseOption;
  finish: FinishOption;
  strap: StrapOption;
  price: number;
}

export interface BagItem {
  id: string;
  name: string;
  config: ProductConfiguration;
  quantity: number;
  addedAt: number;
}

export interface CraftStep {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  macroImage: string;
  spec: string;
}

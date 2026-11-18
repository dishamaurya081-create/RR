export type NavigationTab = 
  | 'overview'
  | 'squad-requirements'
  | 'acquisition-board'
  | 'batter-intelligence'
  | 'bowler-intelligence'
  | 'comparison'
  | 'reliability'
  | 'squad-builder'
  | 'decisions'
  | 'data-quality';

export interface FilterState {
  searchQuery: string;
  roleFilter: string;
  sourceFilter: string;
  statusFilter: string;
  sampleFilter: string;
  overseasFilter: string;
}


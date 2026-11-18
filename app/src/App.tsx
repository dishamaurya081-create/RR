import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { PlayerModal } from './components/common/PlayerModal';
import { ExecutiveOverview } from './components/views/ExecutiveOverview';
import { SquadRequirements } from './components/views/SquadRequirements';
import { PlayerAcquisitionBoard } from './components/views/PlayerAcquisitionBoard';
import { BatterIntelligence } from './components/views/BatterIntelligence';
import { BowlerIntelligence } from './components/views/BowlerIntelligence';
import { PlayerComparison } from './components/views/PlayerComparison';
import { PlayerReliability } from './components/views/PlayerReliability';
import { SquadCombinationBuilder } from './components/views/SquadCombinationBuilder';
import { AcquisitionDecisions } from './components/views/AcquisitionDecisions';
import { DataQualityMethodology } from './components/views/DataQualityMethodology';
import type { Candidate } from './data/intelligenceData';
import type { NavigationTab } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Candidate | null>(null);
  const [comparisonPreselect, setComparisonPreselect] = useState<Candidate | null>(null);

  const handleOpenComparison = (player: Candidate) => {
    setComparisonPreselect(player);
    setActiveTab('comparison');
  };

  return (
    <div className="flex min-h-screen bg-[#080C15] text-slate-100 font-sans antialiased selection:bg-[#EA1A85] selection:text-white">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenDataAudit={() => setActiveTab('data-quality')}
        />

        <main className="flex-1 pb-16">
          {activeTab === 'overview' && (
            <ExecutiveOverview 
              onSelectPlayer={setSelectedPlayer}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'squad-requirements' && (
            <SquadRequirements />
          )}

          {activeTab === 'acquisition-board' && (
            <PlayerAcquisitionBoard 
              onSelectPlayer={setSelectedPlayer}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {activeTab === 'batter-intelligence' && (
            <BatterIntelligence 
              onSelectPlayer={setSelectedPlayer}
            />
          )}

          {activeTab === 'bowler-intelligence' && (
            <BowlerIntelligence 
              onSelectPlayer={setSelectedPlayer}
            />
          )}

          {activeTab === 'comparison' && (
            <PlayerComparison 
              onSelectPlayer={setSelectedPlayer}
              preselectedPlayer={comparisonPreselect}
            />
          )}

          {activeTab === 'reliability' && (
            <PlayerReliability 
              onSelectPlayer={setSelectedPlayer}
            />
          )}

          {activeTab === 'squad-builder' && (
            <SquadCombinationBuilder />
          )}

          {activeTab === 'decisions' && (
            <AcquisitionDecisions 
              onSelectPlayer={setSelectedPlayer}
            />
          )}

          {activeTab === 'data-quality' && (
            <DataQualityMethodology />
          )}
        </main>
      </div>

      {/* Universal Player Profile Modal */}
      <PlayerModal 
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
        onCompareWith={handleOpenComparison}
      />
    </div>
  );
};

export default App;

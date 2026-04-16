import { getRegisteredTeamMember, TeamMemberCard } from '@entities/team-member';
import { SectionHeader } from '@shared/ui';
import './TeamRosterWidget.css';

interface TeamRosterWidgetProps {
  teamTitle: string;
  tournamentTitle: string;
  maxMembers?: number;
}

export function TeamRosterWidget({
  teamTitle,
  tournamentTitle,
  maxMembers,
}: TeamRosterWidgetProps) {
  const member = getRegisteredTeamMember();
  const membersCountLabel = maxMembers ? `1/${maxMembers}` : '1';

  return (
    <section className="team-roster-widget">
      <SectionHeader
        title={`Склад команди - ${teamTitle}`}
        subtitle={tournamentTitle}
        badge={membersCountLabel}
        aside={(
          <button
            type="button"
            className="team-roster-widget__add-button"
            disabled
            aria-label="Додати учасника"
            title="Додавання учасників з'явиться пізніше"
          >
          </button>
        )}
      />

      <div className="team-roster-widget__members">
        <TeamMemberCard member={member} />
      </div>
    </section>
  );
}

import { getRegisteredTeamMember, TeamMemberCard } from '@entities/team-member';
import './TeamRosterWidget.css';

export function TeamRosterWidget() {
  const member = getRegisteredTeamMember();

  return (
    <section className="team-roster-widget">
      <div className="team-roster-widget__members">
        <TeamMemberCard member={member} />
      </div>
    </section>
  );
}

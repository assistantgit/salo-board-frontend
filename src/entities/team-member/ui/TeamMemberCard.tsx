import { createIcon } from '@shared/lib';
import type { TeamMember } from '../model/types';
import './TeamMemberCard.css';

const CloseIcon = createIcon('close-outline', 'close');

interface TeamMemberCardProps {
  member: TeamMember;
  onRemove?: (memberId: TeamMember['id']) => void;
}

export function TeamMemberCard({ member, onRemove }: TeamMemberCardProps) {
  const badges = [
    member.isCurrentUser ? 'You' : undefined,
    member.role,
  ].filter((badge): badge is string => Boolean(badge));

  const handleRemove = () => {
    if (!member.canRemove || !onRemove) {
      return;
    }

    onRemove(member.id);
  };

  return (
    <article className="team-member-card">
      <div className="team-member-card__toolbar">
        <div className="team-member-card__badges">
          {badges.map((badge) => (
            <span
              key={badge}
              className={`team-member-card__badge${
                badge === 'Lead' ? ' team-member-card__badge--accent' : ''
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

        {member.canRemove ? (
          <button
            type="button"
            className="team-member-card__remove"
            onClick={handleRemove}
            aria-label={`Remove ${member.fullName}`}
          >
            <CloseIcon size="xs" />
          </button>
        ) : null}
      </div>

      <div className="team-member-card__avatar" aria-hidden="true">
        {member.initials}
      </div>

      <p className="team-member-card__name">{member.fullName}</p>
    </article>
  );
}

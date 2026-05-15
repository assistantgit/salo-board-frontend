import { type DropdownOption, DropdownSelect } from '@shared/ui/dropdown-select';
import { BuildIcon, BusinessIcon, GridIcon, PersonIcon } from '@shared/ui/icons';
import type React from 'react';
import { type HistoryFilterRole, useHistoryFilterStore } from '../model/store';

interface RoleOption extends DropdownOption {
  value: HistoryFilterRole;
}

const ROLE_OPTIONS: RoleOption[] = [
  { value: 'ALL', label: 'Всі ролі', icon: <GridIcon /> },
  { value: 'participant', label: 'Учасник', icon: <PersonIcon /> },
  { value: 'jury', label: 'Журі', icon: <BusinessIcon /> },
  { value: 'admin', label: 'Адміністратор', icon: <BuildIcon /> },
];

interface HistoryRoleSwitcherProps {
  className?: string;
}

export const HistoryRoleSwitcher: React.FC<HistoryRoleSwitcherProps> = ({ className }) => {
  const role = useHistoryFilterStore((s) => s.role);
  const setRole = useHistoryFilterStore((s) => s.setRole);

  return (
    <DropdownSelect
      options={ROLE_OPTIONS}
      value={role}
      onChange={(val) => setRole(val as HistoryFilterRole)}
      className={className}
    />
  );
};

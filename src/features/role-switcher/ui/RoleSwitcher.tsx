import { useAuthStore, type UserRole } from '@entities/user';
import { DropdownSelect, type DropdownOption } from '@shared/ui/dropdown-select';
import { EyeIcon, PersonIcon, BusinessIcon, UserIcon } from '@shared/ui/icons';

interface RoleOption extends DropdownOption {
  value: UserRole;
}

const ROLE_OPTIONS: RoleOption[] = [
  { value: 'viewer', label: 'Переглядач', icon: <EyeIcon /> },
  { value: 'participant', label: 'Учасник', icon: <PersonIcon /> },
  { value: 'jury', label: 'Журі', icon: <BusinessIcon /> },
  { value: 'admin', label: 'Адміністратор', icon: <UserIcon /> },
];

export const RoleSwitcher = () => {
  const { role, setRole } = useAuthStore();

  const handleRoleChange = (value: string) => {
    setRole(value as UserRole);
  };

  return (
    <DropdownSelect
      options={ROLE_OPTIONS}
      value={role}
      onChange={handleRoleChange}
    />
  );
};

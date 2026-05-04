import { CodeIcon, DocumentIcon, LinkIcon } from '@shared/ui/icons';

export const URL_PATTERN = {
  value: /^(https?:\/\/)?([\w\d\-_]+\.+[A-Za-z]{2,})+\/?/,
  message: 'Невірний формат URL',
};

export const getSubmissionFields = () => [
  {
    name: 'description' as const,
    label: 'Опис роботи',
    placeholder: 'Введіть опис роботи',
    type: 'text' as const,
    isTextArea: true,
  },
  {
    name: 'githubUrl' as const,
    label: 'GitHub',
    placeholder: 'Введіть GitHubURL',
    Icon: CodeIcon,
    type: 'url' as const,
    validation: { pattern: URL_PATTERN },
  },
  {
    name: 'videoUrl' as const,
    label: 'Video',
    placeholder: 'Введіть VideoURL',
    Icon: DocumentIcon,
    type: 'url' as const,
    validation: { pattern: URL_PATTERN },
  },
  {
    name: 'demoUrl' as const,
    label: 'Demo',
    placeholder: 'Введіть DemoURL',
    Icon: LinkIcon,
    type: 'url' as const,
    validation: { pattern: URL_PATTERN },
  },
];

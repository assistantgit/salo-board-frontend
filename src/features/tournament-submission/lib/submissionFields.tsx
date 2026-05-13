import { CodeIcon, DocumentIcon, LinkIcon } from '@shared/ui/icons';

export const URL_PATTERN = {
  value: /^(https?:\/\/)?([\w\d\-_]+\.+[A-Za-z]{2,})+\/?/,
  message: 'Невірний формат URL',
};

export const GITHUB_URL_PATTERN = {
  value: /^(https?:\/\/)?(www\.)?github\.com\/.+/,
  message: 'Має бути посилання на GitHub (github.com)',
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
    placeholder: 'https://github.com/user/repo\nhttps://github.com/user/other-repo',
    Icon: CodeIcon,
    type: 'text' as const,
    isTextArea: true,
    validation: {
      required: 'GitHub посилання є обовʼязковим',
      validate: (value: string) => {
        if (!value?.trim()) return 'GitHub посилання є обовʼязковим';
        const parts = value
          .split(/[\s\n]+/)
          .map((p) => p.trim())
          .filter((p) => p.length > 0);
        const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/.+/;
        for (const part of parts) {
          if (!githubRegex.test(part)) {
            return `Невірний формат: "${part}". Має бути посилання на GitHub.`;
          }
        }
        return true;
      },
    },
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

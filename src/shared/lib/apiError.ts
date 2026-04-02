import type { AxiosError } from "axios"
import type { UseFormSetError, FieldValues, Path } from "react-hook-form"

type FieldErrors = Record<string, string[]>


interface BackendErrorData {
  detail?: string
  error?: string
  [field: string]: unknown
}

const ERROR_TRANSLATIONS: Record<string, string> = {
  "No active account found with the given credentials": "Невірний логін або пароль.",
  "User with this email already exists.": "Користувач з цією поштою вже існує.",
  "This field is required.": "Це поле є обов'язковим.",
  "Enter a valid email address.": "Введіть коректну електронну пошту.",
  "Authentication credentials were not provided.": "Ви не авторизовані.",
  "Ensure this value has at least 8 characters.": "Мінімум 8 символів.",
  "Password is too short.": "Пароль занадто короткий.",

  // Fields for root mapping if needed
  "email": "Електронна пошта",
  "password": "Пароль",
  "firstName": "Ім'я",
  "lastName": "Прізвище",
}


export function applyFieldErrors<T extends FieldValues>(
  err: unknown,
  setError: UseFormSetError<T>,
  knownFields: Path<T>[],
): string | null {
  const axiosErr = err as AxiosError<BackendErrorData>
  const data = axiosErr?.response?.data

  if (!axiosErr?.response) {
    return "Помилка мережі. Перевірте з'єднання."
  }
  const rawDetail = data?.detail || data?.error
  if (typeof rawDetail === "string") {
    return ERROR_TRANSLATIONS[rawDetail] || rawDetail
  }

  let hasFieldErrors = false

  for (const field of knownFields) {
    const fieldErrors = data?.[field as string]
    if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
      const msg = fieldErrors[0]
      setError(field, {
        type: "server",
        message: ERROR_TRANSLATIONS[msg] || msg
      })
      hasFieldErrors = true
    }
  }

  if (hasFieldErrors) {
    return null
  }

  return "Щось пішло не так. Спробуйте ще раз."
}

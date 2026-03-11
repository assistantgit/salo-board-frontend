import React from "react"
import { useForm } from "react-hook-form"
import "./RegisterPage.css"
import { UserIcon, DefaultButton, LoginInputField } from '@shared/ui'

const registerValidation = {
  name: {
    required: "Ім'я є обов'язковим",
    minLength: { value: 2, message: "Мінімум 2 символи" },
  },
  email: {
    required: "Пошта є обов'язковою",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Введіть коректну пошту",
    },
  },
  password: {
    required: "Пароль є обов'язковим",
    minLength: { value: 6, message: "Мінімум 6 символів" },
  },
  confirmPassword: {
    required: "Підтвердіть пароль",
  },
}

type RegisterFormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>()

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Form Data:", data)
  }

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <div className="user-icon-container">
          <UserIcon size={"4xl"} />
        </div>
        <h1 className="register-title">Register</h1>

        <form className="register-form" onSubmit={handleSubmit(onSubmit)} noValidate>

          <LoginInputField
            type="text"
            placeholder="Ім'я та прізвище"
            autoComplete="name"
            inputClassName="register-input"
            error={errors.name?.message}
            props={{ ...register("name", registerValidation.name) }}
          />

          <LoginInputField
            type="email"
            placeholder="Пошта"
            autoComplete="email"
            inputClassName="register-input"
            error={errors.email?.message}
            props={{ ...register("email", registerValidation.email) }}
          />

          <LoginInputField
            type="password"
            placeholder="Пароль"
            autoComplete="new-password"
            inputClassName="register-input"
            error={errors.password?.message}
            props={{ ...register("password", registerValidation.password) }}
          />

          <LoginInputField
            type="password"
            placeholder="Підтвердіть пароль"
            autoComplete="new-password"
            inputClassName="register-input"
            error={errors.confirmPassword?.message}
            props={{
              ...register("confirmPassword", {
                ...registerValidation.confirmPassword,
                validate: (value) =>
                  value === watch("password") || "Паролі не співпадають",
              }),
            }}
          />

          <DefaultButton type="submit" className="register-btn-submit">
            Register
          </DefaultButton>

        </form>

        <p className="register-footer">
          Вже маєте акаунт? <a href="/login">Увійти</a>
        </p>

      </div>
    </div>
  )
}
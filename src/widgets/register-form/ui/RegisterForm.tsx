import React from "react"
import { useForm } from "react-hook-form"
import "./RegisterForm.css"
import { UserIcon, DefaultButton, LoginInputField, AuthFooter } from "@shared/ui"
import { registerValidation, type RegisterFormValues } from "../model/registerValidation"

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>()

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Дані форми:", data)
  }

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <div className="user-icon-container">
          <UserIcon size={"4xl"} />
        </div>

        <h1 className="register-title">Реєстрація</h1>

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
            placeholder="Електронна пошта"
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
            Зареєструватися
          </DefaultButton>

        </form>

        <AuthFooter
          text="Вже маєте обліковий запис?"
          linkText="Увійти"
          linkHref="/login"
        />

      </div>
    </div>
  )
}
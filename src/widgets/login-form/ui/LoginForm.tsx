import React from "react"
import { useForm } from "react-hook-form"
import "./LoginForm.css"
import { UserIcon, DefaultButton, LoginInputField } from '@shared/ui'
import { loginValidation, type LoginFormValues } from "../model/loginValidation"

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>()

  const onSubmit = (data: LoginFormValues) => {
    console.log("Form Data:", data)
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="user-icon-container">
          <UserIcon size={"4xl"} />
        </div>
        <h1 className="login-title">Вхід</h1>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>

          <LoginInputField
            type="email"
            placeholder="Пошта"
            autoComplete="email"
            inputClassName="login-input"
            error={errors.email?.message}
            props={{ ...register("email", loginValidation.email) }}
          />

          <LoginInputField
            type="password"
            placeholder="Пароль"
            autoComplete="current-password"
            inputClassName="login-input"
            error={errors.password?.message}
            props={{ ...register("password", loginValidation.password) }}
          />

          <DefaultButton type="submit" className="login-btn-submit">
            Увійти
          </DefaultButton>

        </form>
         <p className="login-footer">
          Немаєте облікового запису? <a href="/register">Створити</a>
        </p>
      </div>
    </div>
  )
}
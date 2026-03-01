import React from "react"
import { useForm } from "react-hook-form"
import "./LoginForm.css"
import { UserIcon } from "@shared/ui"
import { DefaultButton } from "@shared/ui/buttons/DefaultButton"
import { LoginInputField } from "@shared/ui/inputs/LoginInputField"
import { loginValidation } from "../model/loginValidation"

type LoginFormValues = {
  email: string
  password: string
}

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
        <h1 className="login-title">Login</h1>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>

          <LoginInputField
            type="email"
            placeholder="Email"
            autoComplete="email"
            inputClassName="login-input"
            error={errors.email?.message}
            props={{ ...register("email", loginValidation.email) }}
          />

          <LoginInputField
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            inputClassName="login-input"
            error={errors.password?.message}
            props={{ ...register("password", loginValidation.password) }}
          />

          <DefaultButton type="submit" className="login-btn-submit">
            Login
          </DefaultButton>

        </form>
      </div>
    </div>
  )
}
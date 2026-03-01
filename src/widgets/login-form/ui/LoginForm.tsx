import React from "react"
import { useForm } from "react-hook-form"
import "./LoginForm.css"
import { UserIcon } from "@shared/index"

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
    if (
      data.email !== "danilkasperuk93@gmail.com" ||
      data.password !== "12345"
    ) {
      alert("Невірний email або пароль")
    } else {
      alert("Вхід успішний!")
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="user-icon-container">
          <UserIcon size={"4xl"}/>
        </div>
        <h1 className="login-title">Login</h1>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              autoComplete="email"
              {...register("email", {
                required: "Email обов'язковий",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Введіть коректний email",
                },
              })}
            />
            {errors.email && (
              <p className="error-msg" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              autoComplete="current-password"
              {...register("password", { required: "Пароль обов'язковий" })}
            />
            {errors.password && (
              <p className="error-msg" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <button type="submit" className="login-btn-submit">
            Login
          </button>

        </form>
      </div>
    </div>
  )
}
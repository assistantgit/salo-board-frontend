import React from "react"
import { useForm } from "react-hook-form"
import "./LoginForm.css"

type LoginFormValues = {
  email: string
  password: string
}

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>()

  const onSubmit = (data: LoginFormValues) => {
    if (data.email !== 'danilkasperuk93@gmail.com' || data.password !== '12345') {
      alert('Невірний email або пароль')
    } else {
      alert('Вхід успішний!')
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="user-icon-container">
          <svg viewBox="0 0 100 100" className="avatar-svg">
            <circle cx="50" cy="50" r="46" stroke="black" strokeWidth="6" fill="none" />
            <circle cx="50" cy="38" r="14" fill="black" />
            <path d="M 22 82 C 22 58, 78 58, 78 82 Z" fill="black" />
          </svg>
        </div>

        <h1 className="login-title">Login</h1>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <input
              placeholder="Email"
              className="login-input"
              {...register("email", { required: "Email обов'язковий" })}
            />
            {errors.email && <p className="error-msg">{errors.email.message}</p>}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              {...register("password", { required: "Пароль обов'язковий" })}
            />
            {errors.password && <p className="error-msg">{errors.password.message}</p>}
          </div>

          <button type="submit" className="login-btn-submit">Login</button>
        </form>
      </div>
    </div>
  )
}
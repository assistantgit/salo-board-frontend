import React from "react"
import "./AuthFooter.css"

interface AuthFooterProps {
  text: string
  linkText: string
  linkHref: string
}

export const AuthFooter: React.FC<AuthFooterProps> = ({ text, linkText, linkHref }) => {
  return (
    <p className="auth-footer">
      {text} <a href={linkHref}>{linkText}</a>
    </p>
  )
}

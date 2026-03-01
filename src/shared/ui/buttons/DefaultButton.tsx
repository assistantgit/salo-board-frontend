export type DefaultButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const DefaultButton = ({ children, className = "", ...props }: DefaultButtonProps) => {
    return (
        <button className={`btn ${className}`} {...props}>
            {children}
        </button>
    );
};

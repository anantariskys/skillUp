interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant: 'primary-outline' | 'secondary-outline' | 'secondary' | 'default';
    type :  'button' | 'submit' | 'reset';
    width : 'w-fit'|'w-full'

}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant ,width,type}) => {
    let className;

    switch (variant) {
        case 'primary-outline':
            className = 'border border-primary  bg-transparent hover:bg-primary hover:text-white text-primary ';
            break;
        case 'secondary-outline':
            className = 'border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white';
            break;
        case 'secondary':
            className = 'bg-secondary text-white ';
            break;
        default:
            className = 'bg-primary text-white ';
            break;
    }

    return (
        <button type={type} className={`${width} group h-fit py-2 px-6 rounded ${className} active:scale-95 transition-all`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
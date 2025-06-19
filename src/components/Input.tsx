import React, { InputHTMLAttributes } from 'react';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode; // Add optional icon prop
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, icon, ...props }, ref) => { // Destructure icon prop
    return (
      <div className={`input-container ${className || ''}`}>
        {label && <label className="input-label">{label}</label>}

        {icon && <div className="input-icon">{icon}</div>} {/* Render icon wrapper */}

        <input
          ref={ref}
          className={`input-field ${error ? 'input-error' : ''}`}
          {...props}
          >
        </input>
        {error && <span className="input-error-message">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
export default Input;

// Нам нужен Input компонент прямо сейчас, для того, чтобы положить внутри Input с лева от самого placeholder иконку, которая будет показывать, что это поле для ввода поиска категории FAQ.
// как же в этот компонент положить иконку слева от поля ввода?
// Для этого мы можем использовать псевдоэлемент ::before или ::after в CSS,
// или же использовать дополнительный элемент внутри компонента Input, который будет отображать иконку
//// Например, мы можем добавить div с классом "input-icon" перед полем ввода и стилизовать его с помощью CSS, чтобы иконка отображалась слева от поля ввода
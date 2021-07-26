import { TextField } from '@material-ui/core'
import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent } from 'react'
import s from './SuperInputText.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: boolean
    errorMessage?: string | null
    spanClassName?: string
    isType: string
    target?: "packs" | "cards"

}

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        errorMessage,
        isType,
        className, spanClassName,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {

        //onChange  && onChange(e)// если есть пропс onChange
        //onChange && onChange(e) // то передать ему е (поскольку onChange не обязателен)


        onChangeText && onChangeText(e.currentTarget.value.trim())
        //onChangeText &&  onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
            && e.key === 'Enter' // и если нажата кнопка Enter
            && onEnter() // то вызвать его
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
    //const finalInputClassName = `${error ? s.errorInput : s.superInput} ${className ? className : ''}` // need to fix with (?:) and s.superInput

    return (
        <>
            <TextField
                style={restProps.target === "cards" ? { width: "700px" } : { width: "400px" }}
                //@ts-ignore
                size="small"
                variant="outlined"
                error={error}
                label={isType}
                type={isType}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={s.superInput}
                {...restProps}// отдаём инпуту остальные пропсы если они есть (value например там внутри)

            />
            {error && <span className={finalSpanClassName}>{error}</span>}
        </>
    )
}

export default SuperInputText

import React, { useState, useRef } from "react";
import { css } from "styled-components";

import { cssTextInput, cssInputBorder } from "@app/styles";
import { useUniqueIdGenerator, useTheme } from "@app/utilities";
import { Flex, Labelled, Connected } from "@app/components";

export interface TextFieldProps {
  label: string;
  labelHidden?: boolean;
  multiline?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  help?: string;
  disabled?: boolean;
  focused?: boolean;
  clearButton?: boolean;
  onClear?: (id: string) => void;
  onChange?: (value: string, id: string) => void;
  id?: string;
  placeholder?: string;
  autoFocus?: boolean;
  autoComplete?: boolean;
  spellCheck?: boolean;
  maxLength?: number;
  max?: number | string;
  minLength?: number;
  min?: number | string;
  pattern?: string;
  type?: string;
  role?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const TextField: React.FC<TextFieldProps> = (props) => {
  const theme = useTheme();
  const getUniqueId = useUniqueIdGenerator(
    props.id ? `textfield-${props.id}` : "textfield"
  );

  const {
    label,
    labelHidden,
    multiline,
    prefix,
    suffix,
    left,
    right,
    help,
    disabled,
    focused,
    autoComplete,
    clearButton,
    onClear,
    onChange,
    ...inputProps
  } = props;

  const [focus, setFocus] = useState(Boolean(focused));
  const input = useRef<HTMLInputElement>(null);

  const id = getUniqueId();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.currentTarget.value, id);
  };

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);
  const handleClick = () => input?.current?.focus();

  const prefixMarkup = prefix ? (
    <Flex.Item shrink={0}>{prefix}</Flex.Item>
  ) : null;

  const suffixMarkup = suffix ? (
    <Flex.Item shrink={0}>{suffix}</Flex.Item>
  ) : null;

  const inputStyle = css`
    outline: none;
    ${cssTextInput}
    ${cssInputBorder}
  `;

  return (
    <Labelled id={id} label={label} help={help} hidden={labelHidden}>
      <Connected left={left} right={right}>
        <Flex
          style={{ cursor: "text" }}
          align="center"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
        >
          {prefixMarkup}
          <Flex.Item
            as={multiline ? "textarea" : "input"}
            ref={input}
            css={inputStyle}
            id={id}
            $width={1}
            grow={1}
            paddingLeft={theme.spacing.baseTight}
            paddingRight={theme.spacing.baseTight}
            paddingTop={theme.spacing.tight}
            paddingBottom={theme.spacing.tight}
            autoComplete={autoComplete ? "on" : "off"}
            onChange={handleChange}
            onKeyPress={(event: React.SyntheticEvent) =>
              event.stopPropagation()
            }
            {...inputProps}
          />
          {suffixMarkup}
        </Flex>
      </Connected>
    </Labelled>
  );
};

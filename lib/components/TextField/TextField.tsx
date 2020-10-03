import React, { useState, useRef } from "react";
import { css } from "styled-components";

import { cssProperty, cssTextInput, cssInputBorder } from "@app/styles";
import { ifExists, useUniqueId, useTheme } from "@app/utilities";
import { Flex, Labelled, Connected } from "@app/components";

export interface TextFieldProps {
  label: string;
  labelHidden?: boolean;
  id?: string;
  multiline?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  align?: "left" | "center" | "right";
  help?: string;
  error?: Error;
  disabled?: boolean;
  focused?: boolean;
  clearButton?: boolean;
  onClear?: (id: string) => void;
  onChange?: (value: string, id: string) => void;
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
  const id = useUniqueId(props.id ? `textfield-${props.id}` : "textfield");

  const {
    label,
    labelHidden,
    multiline,
    prefix,
    suffix,
    left,
    right,
    align,
    help,
    error,
    disabled,
    focused,
    autoComplete,
    clearButton,
    onClear,
    onChange = () => undefined,
    ...inputProps
  } = props;

  const [focus, setFocus] = useState(Boolean(focused));
  const input = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.currentTarget.value, id);
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
    ${cssProperty("text-align", align, "left")}
    ${cssProperty("color", ifExists(error, theme.colors.font.body.darken(0.1)))}
    ${cssProperty(
      "background-color",
      ifExists(error, theme.colors.error.fade(0.9))
    )}
  `;

  return (
    <Labelled
      id={id}
      label={label}
      help={help}
      error={error}
      hidden={labelHidden}
    >
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
            data-error={ifExists(error)}
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

import React, { useState, useRef } from "react";
import { css } from "styled-components";
import { UpDownTick } from "@gatsby-tv/icons";

import { cssProperty } from "@lib/styles/property";
import { cssTextInput } from "@lib/styles/typography";
import { cssInputBorder } from "@lib/styles/borders";
import { ifExists } from "@lib/utilities/if-exists";
import { useUniqueId } from "@lib/utilities/use-unique-id";
import { useTheme } from "@lib/utilities/use-theme";
import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
import { Icon } from "@lib/components/Icon";
import { Labelled } from "@lib/components/Labelled";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectGroup {
  title: string;
  options: SelectOption[];
}

const isGroup = (option: SelectOption | SelectGroup) =>
  typeof option === "object" && (option as SelectGroup).options != null;

const parseOption = (option: SelectOption) => (
  <option key={option.value} value={option.value}>
    {option.label}
  </option>
);

const parseGroup = (group: SelectGroup) => (
  <optgroup key={group.title} label={group.title}>
    {group.options.map(parseOption)}
  </optgroup>
);

const parseOptionOrGroup = (option: SelectOption | SelectGroup) =>
  isGroup(option)
    ? parseGroup(option as SelectGroup)
    : parseOption(option as SelectOption);

const flattenOptions = (options: (SelectOption | SelectGroup)[]) =>
  options.reduce(
    (acc: SelectOption[], optionOrGroup: SelectOption | SelectGroup) =>
      isGroup(optionOrGroup)
        ? [...acc, ...(optionOrGroup as SelectGroup).options]
        : [...acc, optionOrGroup as SelectOption],
    []
  );

const getSelectedLabel = (
  options: (SelectOption | SelectGroup)[],
  value?: string
) => {
  if (value == null) return "";
  const selected = flattenOptions(options).find(
    (option) => option.value === value
  );
  return selected ? selected.label : "";
};

export interface SelectProps {
  label: string;
  labelHidden?: boolean;
  id?: string;
  className?: string;
  options?: (SelectOption | SelectGroup)[];
  name?: string;
  value?: string;
  focused?: boolean;
  help?: string;
  error?: Error;
  onChange?: (value: string, id: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function Select(props: SelectProps) {
  const theme = useTheme();
  const id = useUniqueId(props.id ? `select-${props.id}` : "select");

  const {
    className,
    label,
    labelHidden,
    options = [],
    name,
    value,
    focused,
    help,
    error,
    onChange = () => undefined,
    ...selectProps
  } = props;

  const [focus, setFocus] = useState(Boolean(props.focused));
  const select = useRef<HTMLSelectElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.currentTarget.value, id);
  };

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);
  const handleClick = () => select?.current?.focus();

  const selectStyle = css`
    ${cssTextInput}
    ${cssInputBorder}

    select {
      ${cssTextInput}
      outline: none;
      background-color: transparent;
      opacity: 0.001;
      appearance: none;
      text-rendering: auto;
    }
  `;

  return (
    <Labelled
      id={id}
      label={label}
      help={help}
      error={error}
      hidden={labelHidden}
    >
      <Flex
        className={className}
        css={selectStyle}
        gap={theme.spacing.tight}
        align="center"
        data-focus={ifExists(focus)}
        data-error={ifExists(error)}
        paddingLeft={theme.spacing.baseTight}
        paddingRight={theme.spacing.baseTight}
        paddingTop={theme.spacing.tight}
        paddingBottom={theme.spacing.tight}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
      >
        <Flex.Item as="span" grow={1}>
          {getSelectedLabel(options, value)}
        </Flex.Item>
        <Flex.Item as="span">
          <Icon $height={1} ariaLabel="Selection Arrows" source={UpDownTick} />
        </Flex.Item>
        <Box
          as="select"
          ref={select}
          id={id}
          absolute
          $fill
          $width={1}
          onChange={handleChange}
          onKeyPress={(event: React.SyntheticEvent) => event.stopPropagation()}
          {...selectProps}
        >
          {options.map(parseOptionOrGroup)}
        </Box>
      </Flex>
    </Labelled>
  );
}

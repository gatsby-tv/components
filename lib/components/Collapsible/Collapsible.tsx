import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { DownTick } from "@gatsby-tv/icons";

import { Box } from "@lib/components/Box";
import { TextBox } from "@lib/components/TextBox";
import { Flex } from "@lib/components/Flex";
import { Icon } from "@lib/components/Icon";
import { ifExists } from "@lib/utilities/if-exists";
import { useUniqueId } from "@lib/utilities/use-unique-id";
import { useTheme } from "@lib/utilities/use-theme";

export interface CollapsibleProps {
  className?: string;
  children?: React.ReactNode;
  $label?: string;
  $active?: boolean;
}

const CollapsibleBase = styled.div`
  input[type="checkbox"] {
    display: none;
  }

  ${Box}[data-collapsible="content"] {
    max-height: 0px;
    overflow: hidden;
    transition: max-height ${(props) => props.theme.duration.fast} ease-in-out;
  }

  input:checked ~ ${Box}[data-collapsible="content"] {
    max-height: 100vh;
  }

  ${Box}[data-collapsible="content"] > * {
    transition: border-top-left-radius ${(props) =>
      props.theme.duration.instant} linear ${(props) =>
  props.theme.duration.fast}, border-top-right-radius ${(props) =>
  props.theme.duration.instant} linear ${(props) => props.theme.duration.fast};
  }

  input:checked ~ ${Box}[data-collapsible="content"] > * {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    transition: border-top-left-radius ${(props) =>
      props.theme.duration.instant} linear ${(props) =>
  props.theme.duration.instant}, border-top-right-radius ${(props) =>
  props.theme.duration.instant} linear ${(props) =>
  props.theme.duration.instant};
  }
  
  ${Box}[data-collapsible="label"] {
    cursor: pointer;
    display: inline-flex;
    outline: none;
    transition: all ${(props) => props.theme.duration.instant} linear ${(
  props
) => props.theme.duration.fast};
  }

  input:checked ~ ${Box}[data-collapsible="label"] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    transition: all ${(props) => props.theme.duration.instant} linear ${(
  props
) => props.theme.duration.instant};
  }

  ${Box}[data-collapsible="label"] svg {
    transition: all ${(props) => props.theme.duration.fast} ease-in-out;
  }

  input:checked ~ ${Box}[data-collapsible="label"] svg {
    transform: rotate(180deg);
  }
`;

export function Collapsible(props: CollapsibleProps) {
  const id = useUniqueId("collapsible");
  const label = useRef<HTMLLabelElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!content.current || !label.current) return;
    content.current.style.width = `${
      label.current.getBoundingClientRect().width
    }px`;

    label.current.addEventListener("keydown", (event: Event) => {
      const code = (event as any).code;
      if (code === "Enter" || code === "Space") {
        event.preventDefault();
        event.stopPropagation();
        label.current?.click();
      }
    });
  }, []);

  return (
    <CollapsibleBase>
      <input id={id} type="checkbox" checked={ifExists(props.$active)} />
      <Flex
        as="label"
        ref={label}
        htmlFor={id}
        tabIndex={-1}
        className={props.className}
        data-collapsible="label"
        $fill
        $justify="space-between"
        $gap={theme.spacing.tight}
      >
        <TextBox>{props.$label}</TextBox>
        <Icon $width="1.2em" $source={DownTick} />
      </Flex>
      <Box ref={content} data-collapsible="content">
        {props.children}
      </Box>
    </CollapsibleBase>
  );
}

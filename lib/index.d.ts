/* eslint-disable @typescript-eslint/no-explicit-any */

import "styled-components";
import {} from "styled-components/cssprop";

declare module "styled-components" {
  export interface DefaultTheme {
    [key: string]: any;
  }
}

import { storiesOf } from "@storybook/react";
import React from "react";

import { MenuItems } from "./menu-items";

function ExampleMenuItems() {
  return <MenuItems routes={[]} />;
}

storiesOf("Navigation Menu", module).add("Empty Map", () => <ExampleMenuItems />);

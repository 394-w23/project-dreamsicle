import React, { useState } from 'react';
import { Button, Text, Group, Modal, Table, Drawer, useMantineTheme, Title, Checkbox, Radio } from "@mantine/core";

import 'react-credit-cards-2/es/styles-compiled.css';


export default function RestaurantDrawer({ drawerState, setDrawerState,children }) {
    const theme = useMantineTheme();


    
    return (

        <Drawer
            opened={drawerState !== ""}
            onClose={() => setDrawerState("")}
            title="Your cart"
            position="bottom"
            size="93%"
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            padding="lg"

        >

            {children}

        </Drawer>
    )
}

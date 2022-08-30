import * as React from 'react';
import { List } from '@mui/material';
import {ListItemIcon} from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';

 const Listas = () => {
    return (
        <Box>
            <Box
            sx={{
            bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
            pb: open ? 2 : 0,
            }}
        >
            <ListItemButton
            alignItems="flex-start"
            onClick={() => setOpen(!open)}
            sx={{
                px: 3,
                pt: 2.5,
                pb: open ? 0 : 2.5,
                '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
            }}
            >
            <ListItemText
                primary="Build"
                primaryTypographyProps={{
                fontSize: 15,
                fontWeight: 'medium',
                lineHeight: '20px',
                mb: '2px',
                }}
                secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                secondaryTypographyProps={{
                noWrap: true,
                fontSize: 12,
                lineHeight: '16px',
                color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                }}
                sx={{ my: 0 }}
            />
            <KeyboardArrowDown
                sx={{
                mr: -1,
                opacity: 0,
                transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                transition: '0.2s',
                }}
            />
            </ListItemButton>
            {open &&
            data.map((item) => (
                <ListItemButton
                key={item.label}
                sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                >
                <ListItemIcon sx={{ color: 'inherit' }}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                />
                </ListItemButton>

            ))}
        </Box>
      </Box>
    ) 
}
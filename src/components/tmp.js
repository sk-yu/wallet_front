import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import {Grid, Box} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
// import 
import WalletAsset from './WalletAssetGrid';
import WalletTabs from './WalletTabs';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow:1,
        padding: theme.spacing(1),
        // width:"100%",
        minWidth: 800,
        background: '#ffffff'   //todo:ffffff
    },
    title: {
        flexGrow: 1,
    },
    asset: {
        padding: theme.spacing(4), //p={2}
        // textAlign: 'center',
        color: theme.palette.text.primary,
        background: "#f5f5f5"
    },
    paper: {
        padding: theme.spacing(4), //p={2}
        textAlign: 'center',
        color: theme.palette.text.primary,
        background: "#f5f5f5"
    },
    history: {
        padding: theme.spacing(10), //p={2}
        textAlign: 'center',
        color: theme.palette.text.primary,
        background: "#f5f5f5"
    },
}));

export default function Wallet(props) {
    const classes = useStyles();
    const stateAdresses = useSelector((state) => state.wallet.addresses);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onSignOut = () => {
        setAnchorEl(null);
        console.log('sign out');
        props.history.push('/signin');
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6">
                    sk-yu 전자지갑
                    </Typography>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit">
                    <AccountCircle />
                    </IconButton>
                    <Popover
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <Paper>
                            {stateAdresses.length > 0 && stateAdresses.map(address => {
                                return (
                                    <MenuItem key={address} >
                                        <Typography variant="inherit" noWrap>
                                            {address.substr(0,8)}....{address.substr(address.length-5, 5)}
                                        </Typography>
                                    </MenuItem>
                                )})
                            }
                            {stateAdresses.length > 0 && <Divider />}
                            <MenuItem >주소 추가하기</MenuItem>
                            <Divider />
                            <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
                        </Paper>

                    </Popover>
                </Toolbar>
            </AppBar>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                    <Box className={classes.asset}>
                        <WalletAsset/>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <WalletTabs/>
                </Grid>
            </Grid>
        </div>
    );
}



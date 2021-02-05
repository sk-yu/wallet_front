import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
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

import {addressSetAction} from '../../../actions/WalletAction';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    menuButton:{
        
    }
}));

export default function WalletAppbar(props) {
    const classes = useStyles();
    const stateAdresses = useSelector((state) => state.wallet.addresses);
    const dispatch = useDispatch();

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
        // history.push('/signin');
        props.history.push('/signin');
    }

    const handleAddressClick = (address) => {
        return () => {
            console.log('handleAddressClick() : ' + address);
            setAnchorEl(null);
            dispatch(addressSetAction(address));
        } 
    }

    return (
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
                                <MenuItem key={address} onClick={handleAddressClick(address)}>
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
    );
}

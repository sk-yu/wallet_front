import React from 'react';
import {Grid, Box} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

// import 
import WalletAppbar from './appbar/WalletAppbar';
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
    asset: {
        padding: theme.spacing(4), //p={2}
        // textAlign: 'center',
        color: theme.palette.text.primary,
        background: "#f5f5f5"
    }
}));

export default function Wallet(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <WalletAppbar history={props.history}/>
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



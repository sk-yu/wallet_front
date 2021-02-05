import React from 'react';
import {Grid, Box} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    asset: {
        padding: theme.spacing(1), //p={2}
        // textAlign: 'center',
        color: theme.palette.text.primary,
        background: "#ffffff"
    },
}));

{/* <div>
{stateAssets.map(asset=>{
         return (
            <div key = {asset.symbol} >
                <Typography variant="h6" >
                        {asset.symbol} : {amount}
                    <p/>
                </Typography>
                {asset.address}
            </div>
         );
    })
}
</div> */}

export default function WalletAsset() {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={1}>
                <Box>1번</Box>
            </Grid>
        </div>
    );
}
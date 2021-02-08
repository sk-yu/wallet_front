import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {Grid, Box} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

import WalletService from '../../services/WalletService';
import {addressInfoAction} from '../../actions/WalletAction';


export default function WalletAssetGrid() {
    const stateSelected  = useSelector((state) => state.wallet.selectAddress);
    const stateAssets  = useSelector((state) => state.wallet.assets);
    const [mount, setMount] = useState(false);
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState(0);

    const dispatch = useDispatch();

    const getAddressInfo = () => {
        setMount(true);
        dispatch(addressInfoAction()).catch( (error) => {
            console.error(error);
            setMount(false);
        });
    }

    if(!mount) {
        getAddressInfo();
    }

    const getBalance = () => {
        WalletService.balance(stateSelected)
        .then( res => {
            // console.log(res);
            setAddress(stateSelected);
            setAmount(res.amount);
        })
        .catch(() => {
        });
    }

	useEffect(() => { 
        // console.log('called useEffect() stateSelected : ' + stateSelected);
        if(stateSelected !== '') {
        //   return () => {
            getBalance();
        //   }  
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ stateSelected]);

    useEffect(() => {
        // console.log(`WalletAsset component useEffect called`);
        if(stateAssets !== null) {
            const asset = stateAssets.find(asset => asset.symbol === 'ETH');
        
            if(asset !== undefined) {
                // console.log(asset);
                setAmount(asset.amount);
            }
        }

    }, [stateAssets])

    return (
        <div >
            <Grid container spacing = {1}>
                <Grid item xs={1} sm={1}>
                    <Box p={2}>
                    <img src={process.env.PUBLIC_URL + '/ethereum.png'} width="32" height="32" alt="copy url" />
                    </Box>
                </Grid>
                <Grid item xs={11} sm={11}>
                    <Box p={2}>
                        <Typography variant="h6" align="left">
                        {address} : {amount} ETH
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}
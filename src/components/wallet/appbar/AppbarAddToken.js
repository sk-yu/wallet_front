import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WalletService from '../../../services/WalletService';
import { walletInfoAction } from '../../../actions/WalletAction';

const useStyles = makeStyles((theme) => ({
    item: {
        marginTop: theme.spacing(2),
    },
    button: {
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        margin: theme.spacing(2)
    }
}));

export default function AddToken(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [symbol, setSymbol] = useState('');
    const [token, setToken] = useState('');
    const [decimal, setDecimal] = useState(0);
    const stateSelected = useSelector((state) => state.wallet.selectAddress); 
    const dispatch = useDispatch();

    const onDialogOpen = () => {
        setOpen(true);
        props.handleMenuClose();
    }

    const onDialogClose = () => {
        setOpen(false);
    }

    const onClickAdd = async () => {
        console.log(`onClickAdd (symbol:${symbol}, tokenAddress:${token}, decimal:${decimal}) `);
        try{
            const res = await WalletService.addToken({
                symbol,
                token,
                address:stateSelected,
                decimal:parseInt( decimal)
            });
            setOpen(false);

            if(res.data.status === 200) {
                dispatch(walletInfoAction(stateSelected));
            }
            else {
                alert(`add failed : ${res.data.msg}`);
            }

            // console.log(ret);
        }
        catch(error) {
            alert(error.message);
        }

    }

    const onClickCancel = () => {
        setOpen(false);
    }

    const onTokenAddress = (e) => {
        setToken(e.target.value);
    }

    const onSymbol = (e) => {
        setSymbol(e.target.value);
    }

    const onDecimal = (e) => {
        setDecimal(e.target.value);
    }

    return (
        <div>
            <MenuItem onClick={onDialogOpen}>토큰 추가하기</MenuItem>
                <div >
                    <Dialog open={open} onClose={onDialogClose}>
                        <DialogTitle>토큰 추가</DialogTitle>
                        <DialogContent>
                            <TextField fullWidth variant="outlined" label="심볼" type="text" name="symbol" onChange={onSymbol} />
                            <TextField className={classes.item} fullWidth variant="outlined" label="Token 주소" type="text" name="tokenAddress" onChange={onTokenAddress}/>
                            <TextField className={classes.item} fullWidth variant="outlined" label="decimal" type="text" name="decimal" onChange={onDecimal}/>
                        </DialogContent>
                        <DialogActions className={classes.button}>
                            <Button fullWidth variant="contained" color="primary" onClick={onClickAdd}>추가</Button>
                            <Button fullWidth variant="outlined" color="primary" onClick={onClickCancel}>닫기</Button>
                        </DialogActions> 
                    </Dialog>
                </div>

        </div>
    )
}
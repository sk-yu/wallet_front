import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MenuItem, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WalletService from '../../../services/WalletService';
import { addressInfoAction } from '../../../actions/WalletAction';

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


export default function AppbarAddNewAddress(props) {
    const classes = useStyles();
    const [passPhase, setPassPhase] = useState('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    

    const onDialogOpen = () => {
        props.handleMenuClose();
        setOpen(true);
    }

    const onDialogClose = () => {
        setOpen(false);
    }
    
    const onPassPhase = (e) => {
        setPassPhase(e.target.value);
    }

    const onClickAdd = async () => {
        // console.log('send add Address with passphase: ', passPhase);
        try {
            const res = await WalletService.addAddress({passPhase});
            setOpen(false);
            
            if(res.data.status === 200) {
                dispatch(addressInfoAction());
                // alert(`add success : address(${res.data.data.address})`);
            }
            else {
                alert(`add failed : ${res.data.msg}`);
            }
        }
        catch(error) {
            alert(error.message);
        }
    }

    return (
        <div>
            <MenuItem onClick={onDialogOpen}>주소 추가하기</MenuItem>
            <div>
                <Dialog open={open} onClose={onDialogClose}>
                    <DialogTitle>주소 추가</DialogTitle>
                    <DialogContent>
                        <TextField fullWidth variant="outlined" label="2차 비밀번호" type="password" name="passPhase" onChange={onPassPhase}></TextField>
                    </DialogContent>
                    <DialogActions className={classes.button}>
                        <Button fullWidth variant="contained" color="primary" onClick={onClickAdd}>추가</Button>
                        <Button fullWidth variant="outlined" color="primary" onClick={onDialogClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )

}
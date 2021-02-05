import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';

import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {walletInfoAction} from '../../../actions/WalletAction';
	
const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
}));

export default function Asset(props) {
	const { tablValue, index } = props;
	const classes = useStyles();
	const stateSelected = useSelector((state) => state.wallet.selectAddress);
	const [assets, setAssets] = useState([]);

	const dispatch = useDispatch();


	// eslint-disable-next-line react-hooks/exhaustive-deps
	const getWalletInfo = () => {
		
		dispatch(walletInfoAction(stateSelected)).then((res) => {
			setAssets(res.data);
		});
	}

	useEffect(() => {
		// console.log('called useEffect() stateSelected : ' + stateSelected);
		if(stateSelected !== '') {
			getWalletInfo();
		}
	}, [ stateSelected ]);


    return (
		<div
		role="tabpanel"
		hidden={tablValue !== index}
		>
		{tablValue === index && (
			<div>
				<Paper className={classes.root}>
				<Table>
						<TableBody>
						{assets!==null&&assets.map(asset => {
							return (
							<TableRow key={asset.symbol}>
								<TableCell align="left">{asset.symbol}</TableCell>
								<TableCell align="left">{asset.amount}</TableCell>
							</TableRow>
							)
						})
					}
						</TableBody>
					</Table>
				</Paper>
			</div>

		)}
		</div>
    );
}

Asset.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	tablValue: PropTypes.any.isRequired,
};
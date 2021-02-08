import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


import WalletService from '../../../services/WalletService';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		// minWidth: 600,
		// backgroundColor: theme.palette.background.paper,
	},
}));

  
export default function History(props) {
	const { tablValue, index } = props;
	const classes = useStyles();
	const stateToken = useSelector((state) => state.auth.token);
	const stateAssets  = useSelector((state) => state.wallet.assets);
	const [historys, setHistorys] = useState([]);

	const refreshHistorys = () => {
		WalletService.getHistorys(stateToken)
		.then(res => {
			// console.log(res);
			if(res.result !== true) {
				alert('히스토리 가져오기 실패');
			}
			else {
				setHistorys(res.data);
			}
		})
		.catch(err => {
			console.log(err);
			alert('히스토리 가져오기 실패');
		})
	}

	useEffect(() => {
		refreshHistorys();
	}, [stateAssets]);

    return (
		<div
		role="tabpanel"
		hidden={tablValue !== index}
		>
		{tablValue === index && (
			<div>
				<Paper className={classes.root}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="center">블록번호</TableCell>
								<TableCell align="center">보낸주소</TableCell>
								<TableCell align="center">수량</TableCell>
								<TableCell align="center">보낸시간</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
						{historys?historys.map(history => {
							return (
							<TableRow key={history._id}>
								<TableCell align="center">{history.blockNum}</TableCell>
								<TableCell align="center">{history.toAddr}</TableCell>
								<TableCell align="center">{history.amount} {history.symbol}</TableCell>
								<TableCell align="center">{history.createDt.toString().replace(/[TZ]/g, ' ').substring(0, 19)}</TableCell>
							</TableRow>
							)
						}) : <div align="center">loading...</div>
					}
						</TableBody>
					</Table>
				</Paper>
			</div>
		)}
		</div>
    );
}

History.propTypes = {
	index: PropTypes.any.isRequired,
	tablValue: PropTypes.any.isRequired,
};
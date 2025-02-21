import React from 'react';
import get from 'lodash/get';

import Scrollbars from "react-custom-scrollbars";

import {Link} from "react-router-dom";

import withStyles from '@material-ui/core/styles/withStyles';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import TableBody from "@material-ui/core/TableBody";
import {PlansAndDirectionsProps} from './types';
import {appRouter} from "../../../service/router-service";
import {DirectionFields} from "../../Direction/enum";

import {specializationObject} from "../constants";

import connect from './PlansAndDirections.connect';
import styles from './PlansAndDirections.styles';

class PlansAndDirections extends React.PureComponent<PlansAndDirectionsProps> {
    scrollBar: any = null;

    render() {
        const {classes, plans} = this.props;
        
        return (
            <div className={classes.root}>
                <Scrollbars style={{height: 'calc(100vh - 400px)'}} ref={(el) => {this.scrollBar = el}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.header}>Учебный план</TableCell>
                                <TableCell className={classes.header}>Направление</TableCell>
                                <TableCell className={classes.header}>Уровень образования</TableCell>
                                <TableCell className={classes.header}>Год набора</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {plans.map(plan => (
                                plan.directions.map((direction: any, index: number) =>
                                    <TableRow>
                                        {index === 0 ?
                                            <TableCell rowSpan={get(plan.directions, 'length')}>
                                                <Link target="_blank" className={classes.cellLink} to={appRouter.getPlanDetailLink(plan.id)}>{plan.name}</Link>
                                            </TableCell> : <></>
                                        }
                                        <TableCell>
                                            {get(direction, ['field_of_study', DirectionFields.NUMBER], '')} &nbsp;
                                            {get(direction, ['field_of_study', DirectionFields.TITLE], '')} &nbsp;
                                        </TableCell>
                                        <TableCell>
                                            {specializationObject[get(direction, ['field_of_study', DirectionFields.QUALIFICATION])]}
                                        </TableCell>
                                        <TableCell>
                                            {get(direction, 'year')}
                                        </TableCell>
                                    </TableRow>
                                )
                            ))}
                        </TableBody>
                    </Table>
                </Scrollbars>
            </div>
        );
    }
}

export default connect(withStyles(styles)(PlansAndDirections));

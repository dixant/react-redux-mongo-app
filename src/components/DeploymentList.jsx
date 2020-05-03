import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Container, Table, Button } from 'reactstrap';

import  {deleteServer ,} from '../store/actions/index'

const GetDeploymentData = ({servers}) => {
    const dispatch = useDispatch();

    return (
        servers.map((v, i)=>{
            const {_id, url,templateName, version,createdAt} = v;
               
               return (<tr key={_id+'table_Data'}>
                    <td>{url}</td>
                    <td>{templateName}</td>
                    <td>{version}</td>
                    <td>{createdAt}</td>
                    <td><Button onClick={(e)=>dispatch(deleteServer(_id))}>Delete</Button></td>
                </tr>)
        }) 
    )
}
const DeploymentList = () => {
    const {servers, error, isLoading} = useSelector(state => state.server);
    return (
        <Table className="deployment-table">
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Template Name</th>
                    <th>Version</th>
                    <th>deployed Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <GetDeploymentData servers={servers} />

            </tbody>
        </Table>
    )
}
export default DeploymentList;
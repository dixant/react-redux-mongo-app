import ActionConstant from '../../constants/action.constant';
import baseURL from '../../constants/network.constant';

let { ADD_BIGIN, ADD_SUCCESS, ADD_FAILURE, DELETE_BIGIN, DELETE_SUCCESS, DELETE_FAILURE, FETCH_BIGIN, FETCH_SUCCESS, FETCH_FAILURE, TEMPLATE_BIGIN, TEMPLATE_SUCCESS, TEMPLATE_FAILURE } = ActionConstant;
export const fetchTemplateData = () => {
	return dispatch => {
		let myRequest = new Request(`https://api.npoint.io/3eaf24e0b41e2454cd31`, {
			headers: { "Content-Type": "application/json" },
			method: 'GET'
		});
		fetch(myRequest)
			.then(res => res.json())
			.then(res => {
				if (res) {
					dispatch(fetchTemplateDataSuccess(res))
				}
			})
			.catch(error => dispatch(fetchTemplateDataFailure(error)))
	}
}
export const fetchServers = () => {
	return dispatch => {
		dispatch(fetchServersBegin());
		let myRequest = new Request(`${baseURL}api/getDeployments`, {
			headers: { "Content-Type": "application/json; charset=utf-8" },
			method: 'GET'
		});
		return fetch(myRequest)
			.then(res => res.json())
			.then(json => {
				if (json.success) {
					dispatch(fetchServersSuccess(json.data))
				}
				else {
					dispatch(fetchServersFailure(json.err))
				}
			})
			.catch(error => dispatch(fetchServersFailure(error)));
	};
}

export const fetchServersBegin = () => ({
	type: FETCH_BIGIN
});

export const fetchServersSuccess = (servers) => ({
	type: FETCH_SUCCESS,
	payload: { servers }
});

export const fetchServersFailure = error => ({
	type: FETCH_FAILURE,
	payload: { error }
})

export const addServer = (data) => {

	return dispatch => {
		dispatch(addServerBegin());
		let myRequest = new Request(`${baseURL}api/addDeployment`, {
			headers: { "Content-Type": "application/json; charset=utf-8" },
			method: 'POST',
			body: data
		});
		return fetch(myRequest)
			.then(res => res.json())
			.then(json => {
				if (json.success) {
					dispatch(addServersSuccess(json.data))
				}
				else {
					dispatch(addServersFailure(json.err))
				}
			})
			.catch(error => dispatch(addServersFailure(error)));
	};
}

export const addServerBegin = () => ({
	type: ADD_BIGIN
})
export const addServersSuccess = (server) => ({
	type: ADD_SUCCESS,
	payload: { server }
})
export const addServersFailure = (error) => ({
	type: ADD_FAILURE,
	payload: { error }
})

export const deleteServer = (_id) => {

	return dispatch => {
		dispatch(deleteServerBegin());
		let myRequest = new Request(`${baseURL}api/deleteDeployment`, {
			headers: { "Content-Type": "application/json; charset=utf-8" },
			method: 'POST',
			body: JSON.stringify({ _id })
		});
		return fetch(myRequest)
			.then(res => res.json())
			.then(json => {
				if (json.success) {
					dispatch(deleteServersSuccess(_id))
				}
				else {
					dispatch(deleteServersFailure(json.err))
				}
			})
			.catch(error => dispatch(deleteServersFailure(error)));
	};
}

export const deleteServerBegin = () => ({
	type: DELETE_BIGIN
})
export const deleteServersSuccess = (_id) => ({
	type: DELETE_SUCCESS,
	payload: { _id }
})
export const deleteServersFailure = (error) => ({
	type: DELETE_FAILURE,
	payload: { error }
})

export const fetchTemplateDataBigin = () => ({
	type: TEMPLATE_BIGIN
})
export const fetchTemplateDataSuccess = (templateData) => ({
	type: TEMPLATE_SUCCESS,
	payload: { templateData }
})
export const fetchTemplateDataFailure = (error) => ({
	type: TEMPLATE_FAILURE,
	payload: { error }
})
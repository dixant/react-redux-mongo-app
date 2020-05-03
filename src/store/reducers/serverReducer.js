import ActionConstant from '../../constants/action.constant';
import { act } from 'react-dom/test-utils';

const initialState = {
  servers: [],
  isLoading: false,
  isDeleteLoading: false,
  error: null,
  templateData: []
};

export default function serverReducer(state = initialState, action) {
  let { ADD_BIGIN, ADD_SUCCESS, ADD_FAILURE, DELETE_BIGIN, DELETE_SUCCESS, DELETE_FAILURE, FETCH_BIGIN, FETCH_SUCCESS, FETCH_FAILURE, TEMPLATE_BIGIN, TEMPLATE_SUCCESS, TEMPLATE_FAILURE } = ActionConstant;


  switch (action.type) {
    case FETCH_BIGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        servers: [...action.payload.servers]
      };
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    case ADD_BIGIN:
      return {
        ...state,
        isTemplateLoading: true,
        error: null
      };

    case ADD_SUCCESS:
      return {
        ...state,
        isTemplateLoading: false,
        servers: [...state.servers, action.payload.server]
      };
    case ADD_FAILURE:
      return {
        ...state,
        isTemplateLoading: false,
        error: action.payload.error
      };

    case DELETE_BIGIN:
      return {
        ...state,
        isDeleteLoading: true,
        error: null
      };

    case DELETE_SUCCESS:
      const servers = state.servers.filter(v => v._id !== action.payload._id);
      return {
        ...state,
        isDeleteLoading: false,
        servers: servers || []
      };
    case DELETE_FAILURE:
      return {
        ...state,
        isDeleteLoading: false,
        error: action.payload.error
      };
    case TEMPLATE_BIGIN:
      return {
        ...state,
        isTemplateLoading: true,
        error: null
      };
    case TEMPLATE_SUCCESS:
      return {
        ...state,
        isTemplateLoading: false,
        templateData: action.payload.templateData,
        error: null
      };
    case TEMPLATE_FAILURE:
      return {
        ...state,
        isTemplateLoading: false,
        error: action.payload.error
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
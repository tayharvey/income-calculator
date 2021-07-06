import {api, API_URL} from "./APIService";
import {PAGE_LIMIT} from "../consts";


export const fetchAdminUsersService = (sort = null, search = null, page = 1, limit = PAGE_LIMIT) => {
  return api.get(`${API_URL}/admin-users/list/`, {
    params: {
      sort,
      search,
      limit,
      page
    }
  });
};

export const fetchAdminUsersServiceByUrl = (url, sort = null, search = null) => {
  return api.get(url, {params: {sort, search}});
}

export const removeAdminUserService = (id) => {
  return api.delete(`${API_URL}/admin-users/delete/${id}/`);
};

export const addAdminUserService = (data) => {
  return api.post(`${API_URL}/admin-users/create/`, data);
};

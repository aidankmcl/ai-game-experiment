import { CreateUserBody, CreateUserRes, GetUsersRes } from "pages/api/users";
import { GetUserRes } from "pages/api/users/[id]";

import { ClientsideResponse } from 'src/types';

export const createUser = async (input: CreateUserBody): ClientsideResponse<CreateUserRes> => {
  const response = await fetch(`/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });

  const res = await response.json();
  if (!res.data || response.status !== 200) {
    throw res.error || new Error(`Request failed with status ${response.status}`);
  }

  return res.data;
}

export const getUser = async (id: string): ClientsideResponse<GetUserRes> => {
  const response = await fetch(`/api/users/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const res = await response.json();
  if (!res.data || response.status !== 200) {
    throw res.error || new Error(`Request failed with status ${response.status}`);
  }

  return res.data;
}

export const getAllUsers = async (): ClientsideResponse<GetUsersRes> => {
  const response = await fetch(`/api/users`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const res = await response.json();
  if (!res.data || response.status !== 200) {
    throw res.error || new Error(`Request failed with status ${response.status}`);
  }

  return res.data;
}

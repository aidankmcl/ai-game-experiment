import { CreateActionBody, CreateActionRes, GetActionsRes } from "pages/api/saves/[saveID]/actions";
import { GetActionRes, DeleteActionRes } from "pages/api/saves/[saveID]/actions/[id]";

import { ClientsideResponse } from 'src/types';

export const createAction = async (saveID: string | number, input: CreateActionBody): ClientsideResponse<CreateActionRes> => {
  const response = await fetch(`/api/saves/${saveID}/actions`, {
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

export const getAction = async (saveID: string | number, id: string | number): ClientsideResponse<GetActionRes> => {
  const response = await fetch(`/api/saves/${saveID}/actions/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const res = await response.json();
  if (!res.data || response.status !== 200) {
    throw res.error || new Error(`Request failed with status ${response.status}`);
  }

  return res.data;
}

export const getAllActions = async (saveID: string | number): ClientsideResponse<GetActionsRes> => {
  const response = await fetch(`/api/saves/${saveID}/actions`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const res = await response.json();
  if (!res.data || response.status !== 200) {
    throw res.error || new Error(`Request failed with status ${response.status}`);
  }

  return res.data;
}

export const deleteAction = async (saveID: string | number, id: string | number): ClientsideResponse<DeleteActionRes> => {
  const response = await fetch(`/api/saves/${saveID}/actions/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const res = await response.json();
  if (!res.data || response.status !== 200) {
    throw res.error || new Error(`Request failed with status ${response.status}`);
  }

  return res.data;
}

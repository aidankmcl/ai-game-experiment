import { CreateSaveBody, CreateSaveRes, GetSavesRes } from "pages/api/saves";
import { GetSaveRes, DeleteSaveRes } from "pages/api/saves/[saveID]";

import { ClientsideResponse } from 'src/types';

export const createSave = async (input: CreateSaveBody): ClientsideResponse<CreateSaveRes> => {
  const response = await fetch(`/api/saves`, {
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

export const getSave = async (id: string | number): ClientsideResponse<GetSaveRes> => {
  const response = await fetch(`/api/saves/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const res = await response.json();
  if (!res.data || response.status !== 200) {
    throw res.error || new Error(`Request failed with status ${response.status}`);
  }

  return res.data;
}

export const getAllSaves = async (userID?: string | number): ClientsideResponse<GetSavesRes> => {
  const url = userID ? `/api/saves?user=${userID}` : '/api/saves';

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const res = await response.json();
  if (!res.data || response.status !== 200) {
    throw res.error || new Error(`Request failed with status ${response.status}`);
  }

  return res.data;
}

export const deleteSave = async (id: string | number): ClientsideResponse<DeleteSaveRes> => {
  const response = await fetch(`/api/saves/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const res = await response.json();
  if (!res.data || response.status !== 200) {
    throw res.error || new Error(`Request failed with status ${response.status}`);
  }

  return res.data;
}

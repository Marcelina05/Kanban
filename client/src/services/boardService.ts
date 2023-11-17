import { ownerDocument } from "@mui/material";
import pb from "database/database";
import Collections from "enums/Collections";
import Board from "models/Board";
import { FullListOptions, RecordService } from "pocketbase";

const service: RecordService = pb.collection(Collections.BOARD);

export const createBoard = async (title: string, ownerId: string) => {
  const record = {
    title,
    cards: [],
    owner: ownerId
  };

  return service.create(record);
}

export const getAllBoards = async (ownerId: string): Promise<Board[]> => {
  const options: FullListOptions = {
    filter: `owner='${ownerDocument}'`,
  }

  return service.getFullList(options);
}

export const updateBoard = async (id: string, board: Board) => {
  return service.update(id, board);
}

export const deleteBoard = async (id: string): Promise<boolean> => {
  return service.delete(id);
}